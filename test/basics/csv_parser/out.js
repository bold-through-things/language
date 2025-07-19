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
            scope.i = indentifire.store()
            await indentifire.call_or_set(
                scope, 'i', 0
            )
            scope.header = indentifire.store()
            await indentifire.call_or_set(
                scope, 'header', []
            )
            scope.rows = indentifire.store()
            await indentifire.call_or_set(
                scope, 'rows', []
            )

            for (const iter of await indentifire.get_or_call(
                scope , 'lines'
            ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.line = iter

                    if (await indentifire.call_or_set(
                            indentifire, 'eq', await indentifire.get_or_call(
                                scope , 'i'
                            ), 0
                        ))
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            await indentifire.call_or_set(
                                scope , 'header', await indentifire.call_or_set(
                                    await indentifire. get_or_call (
                                       scope ,
                                     'line' 
                                    ) , 'split', ","
                                )
                            )
                        }
                    } 
                    else {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            scope.zip = indentifire.store()
                            await indentifire.call_or_set(
                                scope, 'zip', await indentifire.call_or_set(
                                    indentifire, 'zip', await indentifire.get_or_call(
                                        scope , 'header'
                                    ), await indentifire.call_or_set(
                                        await indentifire. get_or_call (
                                           scope ,
                                         'line' 
                                        ) , 'split', ","
                                    )
                                )
                            )
                            scope.row = indentifire.store()
                            await indentifire.call_or_set(
                                scope, 'row', {}
                            )

                            for (const iter of await indentifire.get_or_call(
                                scope , 'zip'
                            ))
                            {
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    scope.kv = iter
                                    await indentifire.call_or_set(
                                        await indentifire. get_or_call (
                                           scope ,
                                         'row' 
                                        ) , await indentifire.get_or_call(
                                            await indentifire. get_or_call (
                                               scope ,
                                             'kv' 
                                            ) , '0'
                                        ), await indentifire.get_or_call(
                                            await indentifire. get_or_call (
                                               scope ,
                                             'kv' 
                                            ) , '1'
                                        )
                                    )
                                }
                            } 
                            await indentifire.call_or_set(
                                await indentifire. get_or_call (
                                   scope ,
                                 'rows' 
                                ) , 'push', await indentifire.get_or_call(
                                    scope , 'row'
                                )
                            )
                        }
                    } 
                    await indentifire.call_or_set(
                        scope , 'i', await indentifire.call_or_set(
                            indentifire, 'add', await indentifire.get_or_call(
                                scope , 'i'
                            ), 1
                        )
                    )
                }
            } 

            for (const iter of await indentifire.get_or_call(
                scope , 'rows'
            ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.row = iter
                    await indentifire.call_or_set(
                        indentifire, 'log', await indentifire.get_or_call(
                            await indentifire. get_or_call (
                               scope ,
                             'row' 
                            ) , 'name'
                        )
                    )
                }
            } 
            scope.age_over_30 = indentifire.store()
            await indentifire.call_or_set(
                scope, 'age_over_30', 0
            )

            for (const iter of await indentifire.get_or_call(
                scope , 'rows'
            ))
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.row = iter

                    if (await indentifire.call_or_set(
                            indentifire, 'asc', await indentifire.get_or_call(
                                await indentifire. get_or_call (
                                   scope ,
                                 'row' 
                                ) , 'age'
                            ), 30
                        ))
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            await indentifire.call_or_set(
                                scope , 'age_over_30', await indentifire.call_or_set(
                                    indentifire, 'add', await indentifire.get_or_call(
                                        scope , 'age_over_30'
                                    ), 1
                                )
                            )
                        }
                    } 
                }
            } 
            await indentifire.call_or_set(
                indentifire, 'log', await indentifire.get_or_call(
                    scope , 'age_over_30'
                )
            )
        }
    } 
})();