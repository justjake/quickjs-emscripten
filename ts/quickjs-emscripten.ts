/**
 * Typings for the featuers we use to interface with our Empscripten build of
 * QuickJS. */
declare interface QuickJSEmscriptenModule extends EmscriptenModule {
  addFunction(fn: Function, type: string): number
  removeFunction(pointer: number): void
}

export = QuickJSEmscriptenModule