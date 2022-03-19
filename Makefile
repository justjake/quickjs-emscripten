# Tools
CC=clang
EMSDK_VERSION=3.1.7
EMSDK_DOCKER_IMAGE=emscripten/emsdk:$(EMSDK_VERSION)
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) scripts/emcc.sh
GENERATE_TS=$(GENERATE_TS_ENV) npx ts-node generate.ts
PRETTIER=npx prettier

# Paths
QUICKJS_ROOT=quickjs
WRAPPER_ROOT=c
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs

# QuickJS
QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o libbf.o
QUICKJS_OBJS_WASM=$(patsubst %.o, $(BUILD_QUICKJS)/wasm/%.o, $(QUICKJS_OBJS))
QUICKJS_OBJS_WASM_ASYNCIFY=$(patsubst %.o, $(BUILD_QUICKJS)/wasm-asyncify/%.o, $(QUICKJS_OBJS))
QUICKJS_OBJS_NATIVE=$(patsubst %.o, $(BUILD_QUICKJS)/native/%.o, $(QUICKJS_OBJS))
QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\"

# quickjs-emscripten
EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=$(shell cat $(BUILD_WRAPPER)/symbols.json)
EMCC_EXPORTED_FUNCS_ASYNCIFY+=-s EXPORTED_FUNCTIONS=$(shell cat $(BUILD_WRAPPER)/symbols.asyncify.json)

# Emscripten options
CFLAGS_EMCC+=-s WASM=1
CFLAGS_EMCC+=-s EXPORTED_RUNTIME_METHODS=@exportedRuntimeMethods.json
CFLAGS_EMCC+=-s NODEJS_CATCH_EXIT=0
CFLAGS_EMCC+=-s MODULARIZE=1
CFLAGS_EMCC+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_EMCC+=-s INVOKE_RUN=0
CFLAGS_EMCC+=-s ALLOW_MEMORY_GROWTH=1
CFLAGS_EMCC+=-s ALLOW_TABLE_GROWTH=1

# Empscripten options for asyncify variant
# https://emscripten.org/docs/porting/asyncify.html
CFLAGS_EMCC_ASYNCIFY+=-s ASYNCIFY=1
CFLAGS_EMCC_ASYNCIFY+=-DQTS_ASYNCIFY=1
CFLAGS_EMCC_ASYNCIFY+=-s ASYNCIFY_REMOVE=$(shell cat $(BUILD_WRAPPER)/symbols.sync.json)
CFLAGS_EMCC_ASYNCIFY+=-s ASYNCIFY_IMPORTS=$(shell cat $(BUILD_WRAPPER)/symbols.asyncify-imports.json)

ifdef DEBUG
	CFLAGS=-O0
	CFLAGS+=-DQTS_DEBUG_MODE
	CFLAGS_SYNC+=-DQTS_SANITIZE_LEAK
	CFLAGS_SYNC+=-fsanitize=leak
	CFLAGS_SYNC+=-g2

	CFLAGS_EMCC+=-gsource-map
	CFLAGS_EMCC+=-s ASSERTIONS=1

	CFLAGS_EMCC_ASYNCIFY+=-s ASYNCIFY_ADVISE=1
# Need to use -O3 - otherwise ASYNCIFY leads to stack overflows (why?)
	CFLAGS_EMCC_ASYNCIFY+=-O3
# CFLAGS_EMCC+=-s ASYNCIFY_STACK_SIZE=65535

	GENERATE_TS_ENV+=DEBUG=true
else
	CFLAGS=-Oz
	CFLAGS+=-flto

	CFLAGS_EMCC+=-s SINGLE_FILE=1
	CFLAGS_EMCC+=--closure 1
	CFLAGS_EMCC+=-s FILESYSTEM=0
endif


default: wasm wasm-asyncify
all: wasm wasm-asyncify native $(BUILD_ROOT)/quickjs.js
generate: ts/ffi.ts ts/ffi-asyncify.ts
wasm: $(BUILD_DIR) ts/quickjs.emscripten-module.js ts/ffi.ts
wasm-asyncify: $(BUILD_DIR) ts/quickjs-asyncify.emscripten-module.js ts/ffi-asyncify.ts
native: $(BUILD_WRAPPER)/native/test.exe
imports: examples/imports

emcc:
	docker pull $(EMSDK_DOCKER_IMAGE)

$(BUILD_WRAPPER): emcc
	mkdir -p $(BUILD_WRAPPER)/wasm $(BUILD_WRAPPER)/native $(BUILD_WRAPPER)/wasm-asyncify

$(BUILD_QUICKJS): emcc
	mkdir -p $(BUILD_QUICKJS)/wasm $(BUILD_QUICKJS)/native $(BUILD_QUICKJS)/wasm-asyncify

$(BUILD_ROOT): $(BUILD_WRAPPER) $(BUILD_QUICKJS)

$(BUILD_ROOT)/sanitize_test.js: $(WRAPPER_ROOT)/sanitize_test.c
	$(EMCC) -fsanitize=leak -s EXPORTED_FUNCTIONS='["___lsan_do_recoverable_leak_check", "_main"]' -o $@ $< 

# Generated source files
$(WRAPPER_ROOT)/interface.h: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
	$(GENERATE_TS) header $@

# generate.ts not listed because it changes more often for other reasons
$(BUILD_WRAPPER)/symbols.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
	$(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/symbols.asyncify.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT) $(BUILD_WRAPPER)/symbols.sync.json
	ASYNCIFY=true $(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/symbols.sync.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
	ASYNCIFY=true $(GENERATE_TS) sync-symbols $@
	
$(BUILD_WRAPPER)/symbols.asyncify-imports.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT) $(BUILD_WRAPPER)/symbols.sync.json
	ASYNCIFY=true $(GENERATE_TS) async-callback-symbols $@

ts/ffi.ts: $(WRAPPER_ROOT)/interface.c ts/ffi-types.ts generate.ts
	$(GENERATE_TS) ffi $@
	$(PRETTIER) --write $@

ts/ffi-asyncify.ts: $(WRAPPER_ROOT)/interface.c ts/ffi-types.ts generate.ts
	ASYNCIFY=true $(GENERATE_TS) ffi $@
	$(PRETTIER) --write $@

examples/imports: downloadEcmaScriptModules.ts
	npx ts-node downloadEcmaScriptModules.ts "https://esm.sh/react@17" "https://esm.sh/react-dom@17/server"
	touch examples/imports

### Executables
# The WASM module we'll link to typescript
ts/quickjs.emscripten-module.js: $(BUILD_WRAPPER)/wasm/interface.o $(QUICKJS_OBJS_WASM)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(CFLAGS_SYNC) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(QUICKJS_OBJS_WASM)

ts/quickjs-asyncify.emscripten-module.js: $(BUILD_WRAPPER)/wasm-asyncify/interface.o $(QUICKJS_OBJS_WASM_ASYNCIFY)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(CFLAGS_EMCC_ASYNCIFY) $(EMCC_EXPORTED_FUNCS_ASYNCIFY) -o $@ $< $(QUICKJS_OBJS_WASM_ASYNCIFY)

# Trying to debug C...
$(BUILD_WRAPPER)/native/test.exe: $(BUILD_WRAPPER)/native/test.o $(BUILD_WRAPPER)/native/interface.o $(WRAPPER_ROOT) $(QUICKJS_OBJS_NATIVE)
	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -o $@ $< $(BUILD_WRAPPER)/native/interface.o $(QUICKJS_OBJS_NATIVE)

### Object files
# Our wrapper
$(BUILD_WRAPPER)/wasm/%.o: $(WRAPPER_ROOT)/%.c $(BUILD_WRAPPER)/symbols.json $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_SYNC) $(CFLAGS_EMCC) $(EMCC_EXPORTED_FUNCS) -c -o $@ $<

$(BUILD_WRAPPER)/wasm-asyncify/%.o: $(WRAPPER_ROOT)/%.c $(BUILD_WRAPPER)/symbols.asyncify.json $(BUILD_WRAPPER)/symbols.asyncify-imports.json $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(CFLAGS_EMCC_ASYNCIFY) $(EMCC_EXPORTED_FUNCS) -c -o $@ $<

$(BUILD_WRAPPER)/native/test.o: $(WRAPPER_ROOT)/test.c $(WRAPPER_ROOT)/interface.h
	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -c -o $@ $<

$(BUILD_WRAPPER)/native/%.o: $(WRAPPER_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -c -o $@ $<

# QuickJS
$(BUILD_QUICKJS)/wasm/%.o: $(QUICKJS_ROOT)/%.c $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_SYNC) $(CFLAGS_EMCC) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/wasm-asyncify/%.o: $(QUICKJS_ROOT)/%.c $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(CFLAGS_EMCC_ASYNCIFY) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/native/%.o: $(QUICKJS_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) $(CFLAGS_SYNC) $(QUICKJS_DEFINES) -c -o $@ $<

clean-generate:
	rm -rfv ./ts/ffi.ts
	rm -rfv ./ts/ffi-asyncify.ts

clean: clean-generate
	rm -rfv ./ts/quickjs.emscripten-module.js
	rm -rf  ./ts/quickjs.emscripten-module.map
	rm -rf  ./ts/quickjs.emscripten-module.wasm
	rm -rf  ./ts/quickjs.emscripten-module.wasm.map

	rm -rfv ./ts/quickjs-asyncify.emscripten-module.js
	rm -rf  ./ts/quickjs-asyncify.emscripten-module.map
	rm -rf  ./ts/quickjs-asyncify.emscripten-module.wasm
	rm -rf  ./ts/quickjs-asyncify.emscripten-module.wasm.map

	rm -rfv $(BUILD_ROOT)
	rm -rf  $(WRAPPER_ROOT)/interface.h
