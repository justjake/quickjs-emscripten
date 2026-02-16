[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-singlefile-browser-release-sync](../README.md) / default

# Variable: default

> `const` **default**: [`QuickJSSyncVariant`](../../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

Defined in: [index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-browser-release-sync/src/index.ts#L18)

### @jitl/quickjs-singlefile-browser-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-browser-release-sync/README.md) |
Variant with the WASM data embedded into a browser ESModule.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | browser                  | Has these package.json export conditions |
