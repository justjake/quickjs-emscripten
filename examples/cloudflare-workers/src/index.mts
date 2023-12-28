/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import type { QuickJSSyncVariant, QuickJSWASMModule } from 'quickjs-emscripten';
import { newQuickJSWASMModule, RELEASE_SYNC as baseVariant } from 'quickjs-emscripten';
import cloudflareWasmModule from './RELEASE_SYNC.wasm';

// import wasm from '@jitl/quickjs-wasmfile-release-sync/wasm';

function createLoggerProxy<T extends object>(name: string, input: T): T {
	return new Proxy(input, {
		get(target, prop) {
			const value = Reflect.get(target, prop);
			if (!value) {
				console.log(`${name}.${String(prop)}:`, value);
			}
			return value;
		},
		set(target, prop, value) {
			const current = Reflect.get(target, prop);
			if (!current === value) {
				console.log(`${name}.${String(prop)} =`, value);
			}
			return Reflect.set(target, prop, value);
		},
	});
}

const emptySourceMapData = {
	version: 3,
	sources: [],
	names: [],
	mappings: '',
};

const emptySourceMapDataJSON = JSON.stringify(emptySourceMapData);
const emptySourceMapDataURI = `data:application/json;base64,${btoa(emptySourceMapDataJSON)}`;

const variant: QuickJSSyncVariant = {
	...baseVariant,
	async importModuleLoader() {
		const moduleLoader = await baseVariant.importModuleLoader();
		return function newModuleLoader() {
			let runDependenciesLeft = 0;
			const moduleLoaderArg = createLoggerProxy('moduleLoaderArg', {
				// wasmBinary: new Uint8Array(0),
				async instantiateWasm(imports: any, onSuccess: any) {
					// console.log('instantiateWasm called:', imports, onSuccess);
					const instance = await WebAssembly.instantiate(cloudflareWasmModule, imports);
					const instanceProxy = createLoggerProxy('instance', instance);
					onSuccess(instanceProxy);
					return instanceProxy.exports;
				},
				locateFile(fileName: string, ...args: any[]) {
					console.log('locateFile called:', fileName, args);
					const result = (() => {
						if (fileName.endsWith('.map')) {
							return emptySourceMapDataURI;
						}
						return '';
					})();
					console.log('locateFile returning:', result);
					return result;
				},
				monitorRunDependencies(left: number) {
					runDependenciesLeft = left;
				},
				// This should be replaced by --pre-js
				quickjsEmscriptenInit() {
					return {
						fake: true,
						removeRunDependency(name: string) {
							console.log('fake removeRunDependency called:', name);
						},
						receiveSourceMapJSON(data: unknown) {
							console.log('fake receiveSourceMapJSON called:', data);
						},
						WasmOffsetConverter: undefined,
						receiveWasmOffsetConverter(bytes: ArrayBuffer, mod: WebAssembly.Module) {
							console.log('fake receiveWasmOffsetConverter called:', bytes, mod);
						},
					};
				},
			});
			const resultPromise = moduleLoader(moduleLoaderArg);
			const extensions = moduleLoaderArg.quickjsEmscriptenInit();
			console.log('got extensions:', extensions);
			console.log('runDependenciesLeft:', runDependenciesLeft);
			extensions.receiveWasmOffsetConverter(new Uint8Array(0), cloudflareWasmModule);
			if (runDependenciesLeft > 0) {
				extensions.receiveSourceMapJSON(emptySourceMapData);
			}
			return resultPromise;
		};
	},
};

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

let QuickJS: QuickJSWASMModule | undefined;

export default {
	async fetch(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		Object.assign(globalThis, {
			document: globalThis,
			window: globalThis,
			self: globalThis,
			location: {
				href: '',
			},
		});

		QuickJS ??= await newQuickJSWASMModule(variant);
		// const qjs = await getQuickJS();
		const url = new URL(_request.url);
		const code = url.searchParams.get('code') ?? '"Set ?code= to a JS expression to eval"';
		const result = QuickJS.evalCode(code);
		return new Response(JSON.stringify({ code, result }));
	},
};
