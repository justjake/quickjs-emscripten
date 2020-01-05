CC=clang
EMCC=emcc
QUICKJS_ROOT=quickjs
WRAPPER_ROOT=c
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs
# ... BUILD_TYPESCRIPT?

QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o
QUICKJS_OBJS_WASM=$(patsubst %.o, $(BUILD_QUICKJS)/wasm/%.o, $(QUICKJS_OBJS))
QUICKJS_OBJS_NATIVE=$(patsubst %.o, $(BUILD_QUICKJS)/native/%.o, $(QUICKJS_OBJS))
QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\"

CFLAGS_EMCC+=-s WASM=1
CFLAGS_EMCC+=-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
CFLAGS_EMCC+=-s EXPORTED_FUNCTIONS='["_eval"]'
CFLAGS_EMCC+=-s NODEJS_CATCH_EXIT=0
CFLAGS_EMCC+=-s MODULARIZE=1
CFLAGS_EMCC+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_EMCC+=-s INVOKE_RUN=0
CFLAGS_EMCC+=-s ALLOW_MEMORY_GROWTH=1
ifdef DEBUG
	CFLAGS=-O0
	CFLAGS_EMCC+=-g4
	CFLAGS_EMCC+=-s ASSERTIONS=1
else
	CFLAGS=-O3
	CFLAGS_EMCC+=-s SINGLE_FILE=1
	CFLAGS_EMCC+=--closure 1
endif

all: $(BUILD_DIR) $(BUILD_WRAPPER)/wasm/quickjs-emscripten-module.js $(BUILD_WRAPPER)/native/test.exe

$(BUILD_ROOT):
	mkdir -p \
		$(BUILD_WRAPPER)/wasm $(BUILD_WRAPPER)/native \
		$(BUILD_QUICKJS)/wasm $(BUILD_QUICKJS)/native

### Executables
# The WASM module we'll link to typescript
$(BUILD_WRAPPER)/wasm/quickjs-emscripten-module.js: $(BUILD_WRAPPER)/wasm/interface.o $(QUICKJS_OBJS_WASM) ts/quickjs-emscripten-module.d.ts
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) -o $@ $< $(QUICKJS_OBJS_WASM)
	cp ./ts/quickjs-emscripten-module.d.ts $(BUILD_WRAPPER)/wasm

# Trying to debug C...
$(BUILD_WRAPPER)/native/test.exe: $(BUILD_WRAPPER)/native/test.o $(WRAPPER_ROOT) $(QUICKJS_OBJS_NATIVE)
	$(CC) $(CFLAGS) -o $@ $< $(QUICKJS_OBJS_NATIVE)

### Object files
# Our wrapper
$(BUILD_WRAPPER)/wasm/%.o: $(WRAPPER_ROOT)/%.c | $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) -c -o $@ $<

$(BUILD_WRAPPER)/native/test.o: $(WRAPPER_ROOT)/test.c $(WRAPPER_ROOT)/interface.c
	$(CC) $(CFLAGS) -c -o $@ $<

$(BUILD_WRAPPER)/native/%.o: $(WRAPPER_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) -c -o $@ $<

# QuickJS
$(BUILD_QUICKJS)/wasm/%.o: $(QUICKJS_ROOT)/%.c | $(BUILD_ROOT)
	$(EMCC) $(CFLAGS) $(CFLAGS_EMCC) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/native/%.o: $(QUICKJS_ROOT)/%.c | $(BUILD_ROOT)
	$(CC) $(CFLAGS) $(QUICKJS_DEFINES) -c -o $@ $<

clean:
	rm -rfv $(BUILD_ROOT)
