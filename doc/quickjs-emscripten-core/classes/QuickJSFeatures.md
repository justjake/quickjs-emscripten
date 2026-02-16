[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSFeatures

# Class: QuickJSFeatures

Provides feature detection for a QuickJS variant.
Different QuickJS builds may have different feature sets. For example,
mquickjs is a minimal build that doesn't support modules, promises,
symbols, or BigInt.

Access via [QuickJSWASMModule#features](QuickJSWASMModule.md#features), [QuickJSRuntime#features](QuickJSRuntime.md#features),
or [QuickJSContext#features](QuickJSContext.md#features).

## Contents

- [Methods](QuickJSFeatures.md#methods)
  - [assertHas()](QuickJSFeatures.md#asserthas)
  - [has()](QuickJSFeatures.md#has)

## Methods

### assertHas()

> **assertHas**(`feature`, `operation`?): `void`

Assert that this QuickJS variant supports a specific feature.

#### Parameters

• **feature**: [`QuickJSFeature`](../exports.md#quickjsfeature)

The feature to check support for

• **operation?**: `string`

Optional description of the operation being attempted

#### Returns

`void`

#### Throws

If the feature is not supported

#### Source

[packages/quickjs-emscripten-core/src/features.ts:66](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/features.ts#L66)

***

### has()

> **has**(`feature`): `boolean`

Check if this QuickJS variant supports a specific feature.

#### Parameters

• **feature**: [`QuickJSFeature`](../exports.md#quickjsfeature)

The feature to check support for

#### Returns

`boolean`

`true` if the feature is supported, `false` otherwise

#### Source

[packages/quickjs-emscripten-core/src/features.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/features.ts#L25)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
