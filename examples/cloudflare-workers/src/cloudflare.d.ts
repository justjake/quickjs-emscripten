declare module '*.wasm' {
	export default WebAssembly.Module;
}

declare module '*.txt' {
	export default string;
}
