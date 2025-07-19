indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum || a, false),
    asc: (...arr) => arr.every((v, i, a) => !i || a[i - 1] <= v), // who let bro cook? https://stackoverflow.com/a/53833620
    add: (...arr) => arr.reduce((sum, a) => sum + (a ?? 0), 0),
    mod: (...arr) => arr[0] % arr[1], // TODO - shouldn't be a binary operation (how?) TODO - ensure we're not ignoring inputs silently
    none: (...arr) => arr.every(v => !v),
    exists_inside: (inside, ...arr) => {
        if (Array.isArray(inside)) {
            // array
            return arr.every(v => inside.includes(v))
        } else {
            // assume dict
            return arr.every(v => v in inside)
        }
    },
    zip: (...arrays) => {
        const maxLength = Math.max(...arrays.map(x => x.length));
        return Array.from({ length: maxLength }).map((_, i) => {
          return arrays.map(array => array[i]);
        });
    },

    keys: Object.keys.bind(Object),
    values: Object.values.bind(Object),
    log: console.log.bind(console),

    store() {
        const obj = { value: null }
        const fn = (function (set) { if (set !== undefined) { this.value = set; } else { return this.value; } }).bind(obj)
        return fn
    },



    /**
     * Calls a method or sets a property on an object, simulating `obj[field](...)` or `obj[field] = value`.
     * If a setter exists on the prototype, it's invoked. Otherwise, the field is either called (if function) or assigned to.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to call or assign.
     * @param {...unknown} values - Arguments to pass to the method or the value to assign.
     * @returns {Promise<unknown>} The result of the method call, or `undefined` if assigning.
     * @throws {TypeError} If the number of arguments is invalid for the setter or assignment.
     */
    async call_or_set(obj, field, ...values) {
        const proto = Object.getPrototypeOf(obj);
        const desc = proto ? Object.getOwnPropertyDescriptor(proto, field) : undefined;

        if (desc?.set) {
            if (values.length !== 1) {
                throw new TypeError(`Setter for '${String(field)}' expects exactly 1 argument, got ${values.length}`);
            }
            obj[field] = values[0];
            return;
        }

        const member = obj[field];

        if (typeof member === 'function') {
            return await member.call(obj, ...values);
        } else {
            if (values.length !== 1) {
                throw new TypeError(`Assignment to '${String(field)}' expects exactly 1 value, got ${values.length}`);
            }
            obj[field] = values[0];
            return;
        }
    },

    /**
     * Gets a value from an object by field. If it's a function, calls it with `obj` as `this` and returns the result.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to access.
     * @returns {Promise<unknown>} The result of the method call or the field value.
     */
    async get_or_call(obj, field) {
        const value = obj[field];

        if (typeof value === 'function') {
            return await value.call(obj);
        } else {
            return value;
        }
    },

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
    }
}

if (typeof window === "undefined") {
    require("readline")
    const readline = require('readline');

    indentifire.prompt = async function (msg) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let rv = await new Promise(resolve => rl.question(msg, resolve))
        rl.close();
        return rv;
    }

    const fs = require("fs")
    let stdin_cached = null
    // TODO. this builtin really just for "hello world" debugging. in future we should have a full scale pipes API.
    indentifire.stdin = async function () {
        if (stdin_cached == null) {
            stdin_cached = await new Promise((resolve, reject) => fs.readFile(0, 'utf-8', (err, data) => err ? reject(err) : resolve(data)))
        }
        return stdin_cached;
    }

    indentifire.is_tty = () => process.stdin.isTTY
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = indentifire.scope(parent_scope)
            scope.lines = indentifire.store()
            await indentifire.call_or_set(
                scope, 'lines', await indentifire.get_or_call(
                    indentifire, 'stdin'
                )
            )
            await indentifire.call_or_set(
                scope , 'lines', await indentifire.call_or_set(
                    await indentifire. get_or_call (
                       scope ,
                     'lines' 
                    ) , 'split', "\n"
                )
            )
            scope.modules = indentifire.store()
            await indentifire.call_or_set(
                scope, 'modules', {}
            )

            for (const iter of await indentifire.get_or_call(
                scope , 'lines'
            ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.line = iter
                    scope.module = indentifire.store()
                    await indentifire.call_or_set(
                        scope, 'module', {}
                    )
                    scope.kv = indentifire.store()
                    await indentifire.call_or_set(
                        scope, 'kv', await indentifire.call_or_set(
                            await indentifire. get_or_call (
                               scope ,
                             'line' 
                            ) , 'split', ":", 2
                        )
                    )
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'module' 
                        ) , 'id', await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               await indentifire. get_or_call (
                                   scope ,
                               'kv' 
                              ) ,
                             '0' 
                            ) , 'trim'
                        )
                    )
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'module' 
                        ) , 'deps', await indentifire.call_or_set(
                            await indentifire. get_or_call (
                               await indentifire. get_or_call (
                                   await indentifire. get_or_call (
                                         scope ,
                                   'kv' 
                                  ) ,
                               '1' 
                              ) ,
                             'trim' 
                            ) , 'split', /\s+/
                        )
                    )


                    if (await indentifire.call_or_set(
                            indentifire, 'eq', await indentifire.get_or_call(
                                await indentifire. get_or_call (
                                   await indentifire. get_or_call (
                                       scope ,
                                   'kv' 
                                  ) ,
                                 '1' 
                                ) , 'trim'
                            ), ""
                        ))
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            await indentifire.call_or_set(
                                await indentifire. get_or_call (
                                   scope ,
                                 'module' 
                                ) , 'deps', []
                            )
                        }
                    } 
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'modules' 
                        ) , await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'module' 
                            ) , 'id'
                        ), await indentifire.get_or_call(
                            scope , 'module'
                        )
                    )
                }
            } 




            scope.build_order = indentifire.store()
            await indentifire.call_or_set(
                scope, 'build_order', []
            )
            scope.dep_loops = indentifire.store()
            await indentifire.call_or_set(
                scope, 'dep_loops', []
            )
            scope.visit = async function (
                module, 
                chain
            ) 
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.module = module
                    scope.chain = chain

                    if (await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'module' 
                            ) , 'visited'
                        ))
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            return
                        }
                    } 
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'module' 
                        ) , 'visited', true
                    )

                    scope.next_chain = indentifire.store()
                    await indentifire.call_or_set(
                        scope, 'next_chain', await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'chain' 
                            ) , 'slice'
                        )
                    )
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'next_chain' 
                        ) , 'push', await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'module' 
                            ) , 'id'
                        )
                    )

                    for (const iter of await indentifire.get_or_call(
                        await indentifire. get_or_call (
                           scope ,
                         'module' 
                        ) , 'deps'
                    ))
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            scope.dep_id = iter

                            if (await indentifire.call_or_set(
                                    indentifire, 'exists_inside', await indentifire.get_or_call(
                                        scope , 'next_chain'
                                    ), await indentifire.get_or_call(
                                        scope , 'dep_id'
                                    )
                                ))
                            {
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    scope.dep_loop = indentifire.store()
                                    await indentifire.call_or_set(
                                        scope, 'dep_loop', []
                                    )
                                    await indentifire.call_or_set(
                                        await indentifire. get_or_call (
                                           scope ,
                                         'dep_loop' 
                                        ) , 'push', await indentifire.get_or_call(
                                            scope , 'dep_id'
                                        )
                                    )

                                    for (const iter of await indentifire.get_or_call(
                                        await indentifire. get_or_call (
                                           await indentifire. get_or_call (
                                               scope ,
                                           'next_chain' 
                                          ) ,
                                         'slice' 
                                        ) , 'reverse'
                                    ))
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = indentifire.scope(parent_scope)
                                            scope.chain_dep_id = iter
                                            await indentifire.call_or_set(
                                                await indentifire. get_or_call (
                                                   scope ,
                                                 'dep_loop' 
                                                ) , 'push', await indentifire.get_or_call(
                                                    scope , 'chain_dep_id'
                                                )
                                            )

                                            if (await indentifire.call_or_set(
                                                    indentifire, 'eq', await indentifire.get_or_call(
                                                        scope , 'chain_dep_id'
                                                    ), await indentifire.get_or_call(
                                                        scope , 'dep_id'
                                                    )
                                                ))
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = indentifire.scope(parent_scope)
                                                    break
                                                }
                                            } 
                                        }
                                    } 
                                    await indentifire.get_or_call(
                                        await indentifire. get_or_call (
                                           scope ,
                                         'dep_loop' 
                                        ) , 'reverse'
                                    )
                                    await indentifire.call_or_set(
                                        await indentifire. get_or_call (
                                           scope ,
                                         'dep_loops' 
                                        ) , 'push', await indentifire.call_or_set(
                                            await indentifire. get_or_call (
                                               scope ,
                                             'dep_loop' 
                                            ) , 'join', " → "
                                        )
                                    )
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    scope.dep = indentifire.store()
                                    await indentifire.call_or_set(
                                        scope, 'dep', await indentifire.get_or_call(
                                            await indentifire. get_or_call (
                                               scope ,
                                             'modules' 
                                            ) , await indentifire.get_or_call(
                                                scope , 'dep_id'
                                            )
                                        )
                                    )

                                    if (await indentifire.call_or_set(
                                            indentifire, 'none', await indentifire.get_or_call(
                                                await indentifire. get_or_call (
                                                   scope ,
                                                 'dep' 
                                                ) , 'visited'
                                            )
                                        ))
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = indentifire.scope(parent_scope)
                                            await indentifire.call_or_set(
                                                scope , 'visit', await indentifire.get_or_call(
                                                    scope , 'dep'
                                                ), await indentifire.get_or_call(
                                                    scope , 'next_chain'
                                                )
                                            )
                                        }
                                    } 
                                }
                            } 
                        }
                    } 
                    await indentifire.call_or_set(
                        await indentifire. get_or_call (
                           scope ,
                         'build_order' 
                        ) , 'push', await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'module' 
                            ) , 'id'
                        )
                    )
                }
            } 

            for (const iter of await indentifire.call_or_set(
                indentifire, 'values', await indentifire.get_or_call(
                    scope , 'modules'
                )
            ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.module = iter
                    await indentifire.call_or_set(
                        scope , 'visit', await indentifire.get_or_call(
                            scope , 'module'
                        ), []
                    )
                }
            } 

            if (await indentifire.call_or_set(
                    indentifire, 'asc', 1, await indentifire.get_or_call(
                        await indentifire. get_or_call (
                           scope ,
                         'dep_loops' 
                        ) , 'length'
                    )
                ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    await indentifire.call_or_set(
                        indentifire, 'log', await indentifire.call_or_set(
                            indentifire, 'concat', "ERROR: there are dependency loops.\n", await indentifire.call_or_set(
                                await indentifire. get_or_call (
                                   scope ,
                                 'dep_loops' 
                                ) , 'join', "\n"
                            )
                        )
                    )
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    await indentifire.call_or_set(
                        indentifire, 'log', await indentifire.call_or_set(
                            await indentifire. get_or_call (
                               scope ,
                             'build_order' 
                            ) , 'join', "\n"
                        )
                    )
                }
            } 
        }
    } 
})();