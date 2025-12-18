#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write --unstable-raw-imports

import { read_file, walk_recursive } from "../certain/paths.ts";
import { Node } from "../compiler/src_ts/core/node.ts";
import { Tree_parser } from "../compiler/src_ts/core/tree_parser.ts";
import { unroll_parent_chain } from "../compiler/src_ts/pipeline/steps/utils.ts";
import { Fixed, interpret_tree, parse_tokens, Rules, with_guard } from "../compiler/src_ts/utils/new_parser.ts";
import { cut } from "../compiler/src_ts/utils/strutil.ts";

const schema = {
    stencil_file: new Fixed(1),
    target_directory: new Fixed(1),
}

function prompt_choice(question: string, choices: string[]): string {
    while(true) {
        const input = prompt(`${question} (${choices.join("/")}) `);
        if (choices.includes(input ?? "")) {
            return input ?? "";
        }
    }
}

async function display_and_confirm_edit(opts: {
    old_content: string,
    new_content: string,
}): Promise<boolean> {
    let dir: string | null = null;
    try {
        dir = await Deno.makeTempDir();
        await Deno.writeFile(`${dir}/original`, new TextEncoder().encode(opts.old_content));
        await Deno.writeFile(`${dir}/proposed`, new TextEncoder().encode(opts.new_content));

        let context = 6;
        while (true) {
            const diff_res = await new Deno.Command("diff", {
                args: ["-U", context + "", `${dir}/original`, `${dir}/proposed`],
                stdin: "null",
                stdout: "inherit",
                stderr: "inherit",
            }).output();

            if (diff_res.code !== 1) {
                // a 0 would imply no diff which would be... kinda silly
                throw new Error(`diff command RC is ${diff_res.code}, expected 0`);
            }

            const reply = prompt_choice("apply?", ["y", "n", "c"]);
            if (reply === "c") {
                context += 6;
                continue;
            }
            return reply === "y";
        }
    } finally {
        if (dir !== null) {
            Deno.removeSync(dir, { recursive: true });
        }
    }
}

function whitespace_string_from_node(n: Node): string {
    const [_, args] = cut(n.content, " ");
    if (args[0] !== args[args.length - 1]) {
        throw new Error("string must be enclosed in matching quotes");
    }
    return args.slice(1, args.length - 1);
}

function sort_children_always_before_parents(n: Node[]) {
    // TODO. this likely could be done way more efficient.
    //  also i am not convinced that it preserves provided order
    //  need to autotest it. then again, not critical for now, so...
    type Tree_item = {
        node: Node,
        children: Tree_item[],
    }
    function parent_dist(n: Node, p: Node): number | null {
        const parents = unroll_parent_chain(n);
        for (let i = 0; i < parents.length; i++) {
            if (parents[i] === p) {
                return i;
            }
        }
        return null;
    }
    const roots: Tree_item[] = n.map(node => ({ node, children: [] }));
    let changed = true;
    while (changed) {
        changed = false;
        let lowest_dist = Infinity;
        for (const item of roots) {
            let new_parent: Tree_item | null = null;
            for (const potential_parent of roots) {
                if (item === potential_parent) {
                    continue;
                }
                const dist = parent_dist(item.node, potential_parent.node);
                if (dist !== null && dist < lowest_dist) {
                    lowest_dist = dist;
                    new_parent = potential_parent;
                }
            }
            if (new_parent !== null) {
                new_parent.children.push(item);
                roots.splice(roots.indexOf(item), 1);
                changed = true;
            }
        }
    }
    const out: Node[] = [];
    function collect(item: Tree_item) {
        for (const child of item.children) {
            collect(child);
        }
        out.push(item.node);
    }
    for (const root of roots) {
        collect(root);
    }
    return out;
}

async function clean_redundant_whitespace_changes(opts: { old_content: string, new_content: string }): Promise<string> {    
    opts.new_content = opts.new_content.split("\n").map(line => {
        if (line.trim().length === 0) {
            return "";
        }
        return line;
    }).join("\n");
    
    const dir = await Deno.makeTempDir();
    await Deno.writeFile(`${dir}/original`, new TextEncoder().encode(opts.old_content));
    await Deno.writeFile(`${dir}/proposed`, new TextEncoder().encode(opts.new_content));

    const diff_res = await new Deno.Command("diff", {
        args: ["--ignore-blank-lines", "--ignore-trailing-space", `${dir}/original`, `${dir}/proposed`],
        stdin: "null",
        stdout: "piped",
        stderr: "inherit",
    }).output();

    if ([0, 1].includes(diff_res.code) === false) {
        throw new Error(`diff command RC is ${diff_res.code}`);
    }

    const cleaned_diff = new TextDecoder().decode(diff_res.stdout);
    const diff_file = `${dir}/diff`;
    await Deno.writeFile(diff_file, new TextEncoder().encode(cleaned_diff));

    const patch_res = await new Deno.Command("patch", {
        args: [`${dir}/original`, "-i", diff_file],
        stdin: "null",
        stdout: "null",
        stderr: "inherit",
    }).output();

    if (patch_res.code !== 0) {
        throw new Error(`patch command RC is ${patch_res.code}, expected 0`);
    }

    const final_content = new TextDecoder().decode(await Deno.readFile(`${dir}/original`));

    Deno.removeSync(dir, { recursive: true });

    return final_content;
}

async function stencil(args: Args) {
    const apply = (() => {
        const CURRENT_MATCH = Symbol("CURRENT_MATCH");

        type Ctx = { [key: string | symbol]: unknown };
        type Apply_opts = {
            stencil: Node,
            target: Node,
            ctx: Ctx,
            query_edit: (n: Node, edit: () => Promise<void>) => void,
        };
        let apply: (opts: Apply_opts) => Promise<unknown> = () => Promise.resolve();

        const instructions: { [key: string]: (opts: Apply_opts & { details: string }) => Promise<unknown> } = {};

        instructions["stencil"] = async (opts: Apply_opts & { details: string }) => {
            const ctx = {}
            for (const child of opts.stencil.children) {
                await apply({ ...opts, stencil: child, ctx });
            }
        };
        instructions["match_content"] = async (opts: Apply_opts & { details: string }) => {
            const schema = {
                "regex": new Fixed(1)
            }
            const tree = parse_tokens(opts.details.split(" "), schema);
            type Regex_command = {
                mode: "regex",
                regex: string,
            }
            type Command = Regex_command | null;
            const rules = new Rules<Command>();
            const regex_rules = new Rules<Regex_command>();
            const interpreted = interpret_tree<typeof schema, Command>({
                initial: null,
                tree: tree,
                rules: [
                    rules.mode_switch("regex", () => ({ mode: "regex", regex: "" })),
                    with_guard((v) => v?.mode === "regex", regex_rules.required("regex", "regex")),
                ]
            });

            if (interpreted == null) {
                throw new Error("no command provided for `match_content`");
            }

            const re = new RegExp(interpreted.regex);
            opts.ctx[CURRENT_MATCH] ??= [];
            const current_match = opts.ctx[CURRENT_MATCH]
            if (!Array.isArray(current_match)) {
                throw new Error("CURRENT_MATCH is not Array (internal error)");
            }
            opts.target.walk_tree_top_down((n: Node) => {
                if (re.test(n.content)) {
                    current_match.push(n);
                }
            });

            return await void 0;
        };
        function create_editor(edit_fn: (n: Node, opts: Apply_opts & { details: string }) => Node) {
            return async (opts: Apply_opts & { details: string }) => {
                const current_match = opts.ctx[CURRENT_MATCH];
                if (!Array.isArray(current_match)) {
                    throw new Error("no match to prepend to");
                }
                for (const node of current_match) {
                    if (node.parent == null) {
                        throw new Error("editing top level");
                    }
                    opts.query_edit(node, async () => {
                        let new_ = node.copy_recursive();
                        new_ = edit_fn(new_, opts);
                        const new_tree = opts.target.copy_with_replacements(new Map([[node, new_]]));
                        const approved = await display_and_confirm_edit({
                            old_content: opts.target.indented_repr(),
                            new_content: new_tree.indented_repr(),
                        })
                        if (approved) {
                            node.parent.replace_child(node, new_);
                        }
                    });
                }
            }
        }
        instructions["prepend_content"] = create_editor((n, opts) => {
            let to_prepend = opts.details
            for (const child of opts.stencil.children) {
                if (child.content.startsWith("string ")) {
                    to_prepend += whitespace_string_from_node(child);
                } else {
                    throw new Error(`unknown prepend_content child command \`${child.content}\``);
                }
            }
            n.content = to_prepend + n.content;
            return n;
        });
        instructions["replace_content"] = create_editor((n, opts) => {
            let to_replace = opts.details
            for (const child of opts.stencil.children) {
                if (child.content.startsWith("string ")) {
                    to_replace += whitespace_string_from_node(child);
                } else {
                    throw new Error(`unknown prepend_content child command \`${child.content}\``);
                }
            }
            n.content = to_replace;
            return n;
        });

        apply = async (opts: Apply_opts) => {
            const [instruction, details] = cut(opts.stencil.content, " ")
            if (instructions[instruction] !== undefined) {
                return await instructions[instruction]({ ...opts, details });
            }
            if (instruction.trim().length === 0) {
                return await void 0;
            }
            throw new Error(`no instruction known \`${instruction}\``);
        }

        return apply;
    })();
    
    const stencil_content = read_file(args.stencil_file);
    if (stencil_content === null) {
        throw new Error(`no such stencil file found ${args.stencil_file}`);
    }
    const stencil_tree = new Tree_parser({top_level: "stencil"}).parse_tree(stencil_content);

    for (const file_path of walk_recursive(args.target_directory)) {
        if (!file_path.endsWith(".67lang")) {
            continue;
        }
        const file_content = read_file(file_path);
        if (file_content === null) {
            throw new Error(`failed to read file ${file_path}`);
        }

        console.log(file_path);

        const file_tree = new Tree_parser({top_level: "67lang:file"}).parse_tree(file_content);
        const ctx: { [key: string | symbol]: unknown } = {};
        const edits: [Node, () => Promise<void>][] = [];
        const query_edit = (n: Node, edit: () => Promise<void>) => edits.push([n, edit]);
        await apply({ stencil: stencil_tree, target: file_tree, ctx, query_edit });

        const edits_map = new Map(edits);;
        const sorted_nodes = sort_children_always_before_parents(Array.from(edits_map.keys()));
        for (const n of sorted_nodes) {
            const edit = edits_map.get(n);
            if (edit === undefined) {
                throw new Error("edit was not found");
            }
            await edit();
        }
        
        const new_content = file_tree.children.map(child => child.indented_repr()).join("\n");
        const new_clean = await clean_redundant_whitespace_changes({ old_content: file_content, new_content });
        if (new_clean !== file_content) {
            Deno.writeTextFileSync(file_path, new_clean);
        }
    }
}

type Args = { stencil_file: string; target_directory: string };
function parseArgs(args: string[]): Args {
    const parsed = parse_tokens(args, schema);

    function required(key: keyof typeof schema): string {
        const val = parsed[key];
        if (val === null || val[0] === undefined) {
            throw new Error(`Missing required argument: ${key}`);
        }
        return val[0].value.join("");
    }

    return {
        stencil_file: required("stencil_file"),
        target_directory: required("target_directory"),
    };
}

async function main() {
    const args = parseArgs(Deno.args);
    await stencil(args);
}

if (import.meta.main) {
    main();
}
