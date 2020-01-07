// ts/quickjs-emscripten-module.d.ts
// This file is copied into build/wrapper/wasm to provide typings.

declare const pointerBrand: unique symbol

interface EnhancedEmscriptenModule extends EmscriptenModule {
  addFunction(fn: Function, type: string): number
  removeFunction(pointer: number): void
}

declare function ModuleLoader(): EnhancedEmscriptenModule
export = ModuleLoader
