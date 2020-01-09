// ts/quickjs-emscripten-module.d.ts
// This file is copied into build/wrapper/wasm to provide typings.

export interface QuickJSEmscriptenModule extends EmscriptenModule {
  addFunction(fn: Function, type: string): number
  removeFunction(pointer: number): void
}

declare function ModuleLoader(): QuickJSEmscriptenModule
export default ModuleLoader
