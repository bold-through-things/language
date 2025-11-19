// core/exceptions.ts

import { NEVER } from "../compiler_types/proper_types.ts";

// Crystal: class MacroAssertFailed < Exception
export class MacroAssertFailed extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MacroAssertFailed";
  }
}

export function graceful_typecheck<T>(fn: () => T): T | typeof NEVER{
  try {
    const rv = fn();
    return rv;
  } catch (e) {
    return NEVER;
  }
}
