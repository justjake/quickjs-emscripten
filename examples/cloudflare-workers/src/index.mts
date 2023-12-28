/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import type { QuickJSWASMModule } from 'quickjs-emscripten';
import { newQuickJSWASMModule, DEBUG_SYNC as baseVariant, newVariant } from 'quickjs-emscripten';
import cloudflareWasmModule from '@jitl/quickjs-wasmfile-debug-sync/wasm';
import cloudflareWasmModuleSourceMap from './DEBUG_SYNC.wasm.map.txt';

const cloudflareVariant = newVariant(baseVariant, {
	wasmModule: cloudflareWasmModule,
	wasmSourceMapData: cloudflareWasmModuleSourceMap,
});

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
}

let QuickJS: QuickJSWASMModule | undefined;

export default {
	async fetch(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		QuickJS ??= await newQuickJSWASMModule(cloudflareVariant);
		const url = new URL(_request.url);
		const code = url.searchParams.get('code') ?? '"Set ?code= to a JS expression to eval"';
		const result = QuickJS.evalCode(code);
		return new Response(JSON.stringify({ code, result }));
	},
};
