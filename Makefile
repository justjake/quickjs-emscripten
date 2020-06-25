CC=clang
EMCC=emcc
QUICKJS_ROOT=quickjs
WRAPPER_ROOT=c
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs

QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o libbf.o
QUICKJS_OBJS_WASM=$(patsubst %.o, $(BUILD_QUICKJS)/wasm/%.o, $(QUICKJS_OBJS))
QUICKJS_OBJS_NATIVE=$(patsubst %.o, $(BUILD_QUICKJS)/native/%.o, $(QUICKJS_OBJS))
QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\"

EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=$(shell cat $(BUILD_WRAPPER)/symbols.json)

CFLAGS_EMCC+=-s WASM=1
CFLAGS_EMCC+=-s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "addFunction", "removeFunction", "_malloc", "_free"]'
CFLAGS_EMCC+=-s NODEJS_CATCH_EXIT=0
CFLAGS_EMCC+=-s MODULARIZE=1
CFLAGS_EMCC+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_EMCC+=-s INVOKE_RUN=0
CFLAGS_EMCC+=-s ALLOW_MEMORY_GROWTH=1
CFLAGS_EMCC+=-s ALLOW_TABLE_GROWTH=1
ifdef DEBUG
	CFLAGS=-O0
	CFLAGS_EMCC+=-g4
	CFLAGS_EMCC+=-s ASSERTIONS=1
else
	CFLAGS=-O3
	CFLAGS_EMCC+=-s SINGLE_FILE=1
	CFLAGS_EMCC+=--closure 1
endif

wasm: $(BUILD_DIR) ts/quickjs-emscripten-module.js  ts/ffi.ts
native: $(BUILD_WRAPPER)/native/test.exe
all: wasm native

$(BUILD_WRAPPER):
	mkdir -p $(BUILD_WRAPPER)/wasm $(BUILD_WRAPPER)/native

$(BUILD_QUICKJS):
	mkdir -p $(BUILD_QUICKJS)/wasm $(BUILD_QUICKJS)/native

$(BUILD_ROOT): $(BUILD_WRAPPER) $(BUILD_QUICKJS)

# Generated source files
$(WRAPPER_ROOT)/interface.h: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
	ts-node generate.ts header $@

# generate.ts not listed because it changes more often for other reasons
$(BUILD_WRAPPER)/symbols.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
	ts-node generate.ts symbols $@

ts/ffi.ts: $(WRAPPER_ROOT)/interface.c ts/ffi-types.ts generate.ts
	ts-node generate.ts ffi $@

### Executables
# The WASM module we'll link to typescript
ts/quickjs-emscripten-module.js: $(BUILD_WRAPPER)/wasm/interface.o $(QUICKJS_OBJS_WASM)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(QUICKJS_OBJS_WASM)

# Trying to debug C...
$(BUILD_WRAPPER)/native/test.exe: $(BUILD_WRAPPER)/native/test.o $(BUILD_WRAPPER)/native/interface.o $(WRAPPER_ROOT) $(QUICKJS_OBJS_NATIVE)
	$(CC) $(CFLAGS) -o $@ $< $(BUILD_WRAPPER)/native/interface.o $(QUICKJS_OBJS_NATIVE)

### Object files
# Our wrapper
$(BUILD_WRAPPER)/wasm/%.o: $(WRAPPER_ROOT)/%.c $(BUILD_WRAPPER)/symbols.json $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(EMCC_EXPORTED_FUNCS) -c -o $@ $<

$(BUILD_WRAPPER)/native/test.o: $(WRAPPER_ROOT)/test.c $(WRAPPER_ROOT)/interface.h
	$(CC) $(CFLAGS) -c -o $@ $<

$(BUILD_WRAPPER)/native/%.o: $(WRAPPER_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) -c -o $@ $<

# QuickJS
$(BUILD_QUICKJS)/wasm/%.o: $(QUICKJS_ROOT)/%.c $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/native/%.o: $(QUICKJS_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) $(QUICKJS_DEFINES) -c -o $@ $<

clean:
	git checkout -- ./ts/ffi.ts
	git checkout -- ./ts/quickjs-emscripten-module.js
	rm -rf ./ts/quickjs-emscripten-module.map
	rm -rf ./ts/quickjs-emscripten-module.wasm
	rm -rf ./ts/quickjs-emscripten-module.wasm.map
	rm -rfv $(BUILD_ROOT)
	rm -rf $(WRAPPER_ROOT)/interface.h
