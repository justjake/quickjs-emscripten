# Tools
CC=clang
EMSDK_VERSION=3.1.7
EMSDK_DOCKER_IMAGE=emscripten/emsdk:$(EMSDK_VERSION)
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) scripts/emcc.sh
GENERATE_TS=$(VARIANT_GENERATE_TS_ENV) npx ts-node generate.ts
PRETTIER=npx prettier

DEBUG_MAKE=1

# build variant matrix
# VARY - just to remember the we should put variant defs in
# VARIANT - The current variant, must be set statically
# https://stackoverflow.com/questions/53225617/makefile-targets-as-cross-product-of-two-lists
# This suggests pulling the current setting out of some matrix.
# getmain = $(word 1,$(subst _, ,$@))
# https://stackoverflow.com/questions/21246165/how-to-break-a-string-across-lines-in-a-makefile-without-spaces/50863019#50863019
VARY=PLATFORM RELEASE SYNC
VARY_PLATFORM:=WASM NATIVE
VARY_RELEASE:=DEBUG RELEASE
VARY_SYNC:=SYNC ASYNCIFY

WASM_VARIANTS=$(foreach RELEASE,$(VARY_RELEASE),$(addprefix WASM_$(RELEASE)_,$(VARY_SYNC)))
NATIVE_VARIANTS=$(foreach RELEASE,$(VARY_RELEASE),NATIVE_$(RELEASE)_SYNC)
VARIANTS=$(WASM_VARIANTS) $(NATIVE_VARIANTS)

PLATFORM = $(word 1,$(subst _, ,$(VARIANT)))
RELEASE = $(word 2,$(subst _, ,$(VARIANT)))
SYNC = $(word 3,$(subst _, ,$(VARIANT)))

# Paths
QUICKJS_ROOT=quickjs
WRAPPER_ROOT=c
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs
BUILD_TS=ts/generated

# QuickJS
QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o libbf.o
QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\"
VARIANT_QUICKJS_OBJS=$(patsubst %.o, $(BUILD_QUICKJS)/%.$(VARIANT).o, $(QUICKJS_OBJS))

# quickjs-emscripten
EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.json
EMCC_EXPORTED_FUNCS_ASYNCIFY+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.asyncify.json

# Emscripten options
CFLAGS_WASM+=-s WASM=1
CFLAGS_WASM+=-s EXPORTED_RUNTIME_METHODS=@exportedRuntimeMethods.json
CFLAGS_WASM+=-s NODEJS_CATCH_EXIT=0
CFLAGS_WASM+=-s MODULARIZE=1
CFLAGS_WASM+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_WASM+=-s INVOKE_RUN=0
CFLAGS_WASM+=-s ALLOW_MEMORY_GROWTH=1
CFLAGS_WASM+=-s ALLOW_TABLE_GROWTH=1

# Empscripten options for asyncify variant
# https://emscripten.org/docs/porting/asyncify.html
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY=1
CFLAGS_WASM_ASYNCIFY+=-DQTS_ASYNCIFY=1
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json
GENERATE_TS_ENV_ASYNCIFY+=ASYNCIFY=1

# Release options
CFLAGS_RELEASE=-Oz
CFLAGS_RELEASE+=-flto

CFLAGS_WASM_RELEASE+=-s SINGLE_FILE=1
CFLAGS_WASM_RELEASE+=--closure 1
CFLAGS_WASM_RELEASE+=-s FILESYSTEM=0

# Debug options
GENERATE_TS_ENV_DEBUG+=DEBUG=true
CFLAGS_DEBUG+=-O0
CFLAGS_DEBUG+=-DQTS_DEBUG_MODE
CFLAGS_WASM_DEBUG+=-gsource-map
CFLAGS_WASM_DEBUG+=-s ASSERTIONS=1

CFLAGS_DEBUG_SYNC+=-DQTS_SANITIZE_LEAK
CFLAGS_DEBUG_SYNC+=-fsanitize=leak
CFLAGS_DEBUG_SYNC+=-g2

CFLAGS_WASM_DEBUG_ASYNCIFY+=-s ASYNCIFY_ADVISE=1
# Need to use -O3 - otherwise ASYNCIFY leads to stack overflows (why?)
CFLAGS_WASM_DEBUG_ASYNCIFY+=-O3

# Variant vars
VARIANT_GENERATE_TS_ENV=$(GENERATE_TS_ENV) $(GENERATE_TS_ENV_$(RELEASE)) $(GENERATE_TS_ENV_$(SYNC)) $(GENERATE_TS_ENV_$(VARIANT))
VARIANT_CFLAGS_WASM=$(CFLAGS_WASM) $(CFLAGS_WASM_$(RELEASE)) $(CFLAGS_WASM_$(SYNC)) $(CFLAGS_WASM_$(VARIANT))
VARIANT_CFLAGS=$(CFLAGS) $(CFLAGS_$(RELEASE)) $(CFLAGS_$(SYNC)) $(CFLAGS_$(VARIANT))

ifeq ($(PLATFORM),WASM)
	VARIANT_CFLAGS+=$(VARIANT_CFLAGS_WASM)
endif
ifdef DEBUG_MAKE
	MKDIRP=@echo "\n=====[["" target: $@, deps: $<, variant: $(VARIANT) ""]]=====" ; mkdir -p $(dir $@)
else
	MKDIRP=@mkdir -p $(dir $@)
endif

###############################################################################
# High level targets

wasm: $(WASM_VARIANTS)
all: $(VARIANTS)

.PHONY: test
test:
	yarn test

emcc: scripts/emcc.sh

scripts/emcc.sh:
	docker pull $(EMSDK_DOCKER_IMAGE)
	touch scripts/emcc.sh

examples/imports: downloadEcmaScriptModules.ts
	npx ts-node downloadEcmaScriptModules.ts "https://esm.sh/react@17" "https://esm.sh/react-dom@17/server"
	touch examples/imports

clean-generate:
	rm -rfv ts/generated/*.ts

clean:
	rm -rfv ts/generated
	rm -rfv $(BUILD_ROOT)
	rm -rf  $(WRAPPER_ROOT)/interface.h

GENERATE_VARIANTS=$(addprefix generate.,$(WASM_VARIANTS))
generate: $(GENERATE_VARIANTS)

###############################################################################
# Variant dispatch
# For each variant, spawn a recursive build of this makefile
# with the VARIANT= statically set so it can be used in static rule contexts.
# I'm not good enough at Makefile to do this any other way, sorry.
$(VARIANTS): VARIANT=$@
$(VARIANTS): %:
	@$(MAKE) VARIANT=$(VARIANT) VARIANT

VARIANT: $(PLATFORM)
# Suppress "nothing to be done"
	@echo >/dev/null

$(GENERATE_VARIANTS): VARIANT=$*
$(GENERATE_VARIANTS): generate.%:
	@$(MAKE) VARIANT=$(VARIANT) GENERATE

###############################################################################
# Native variants
NATIVE: $(BUILD_WRAPPER)/test.$(VARIANT).exe

$(BUILD_WRAPPER)/test.$(VARIANT).exe: $(BUILD_WRAPPER)/test.$(VARIANT).o $(BUILD_WRAPPER)/interface.$(VARIANT).o $(VARIANT_QUICKJS_OBJS)
	$(MKDIRP)
	$(CC) $(VARIANT_CFLAGS) -o $@ $< 

$(BUILD_WRAPPER)/test.$(VARIANT).o: $(WRAPPER_ROOT)/test.c $(WRAPPER_ROOT)/interface.h
	$(MKDIRP)
	$(CC) $(VARIANT_CFLAGS) -o $@ $< 

$(BUILD_WRAPPER)/%.NATIVE_$(RELEASE)_$(SYNC).o: $(WRAPPER_ROOT)/%.c
	$(MKDIRP)
	$(CC) $(VARIANT_CFLAGS) -o $@ $< 

$(BUILD_QUICKJS)/%.NATIVE_$(RELEASE)_$(SYNC).o: $(QUICKJS_ROOT)/%.c
	$(MKDIRP)
	$(CC) $(VARIANT_CFLAGS) $(QUICKJS_DEFINES) -c -o $@ $<

$(WRAPPER_ROOT)/interface.h: $(WRAPPER_ROOT)/interface.c generate.ts
	$(MKDIRP)
	$(GENERATE_TS) header $@

###############################################################################
# WASM variants
WASM: $(BUILD_TS)/emscripten-module.$(VARIANT).js GENERATE
GENERATE: $(BUILD_TS)/ffi.$(VARIANT).ts 

$(BUILD_TS)/emscripten-module.$(VARIANT).js: $(BUILD_WRAPPER)/interface.$(VARIANT).o $(VARIANT_QUICKJS_OBJS) | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(VARIANT_CFLAGS) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

$(BUILD_WRAPPER)/%.WASM_$(RELEASE)_$(SYNC).o: $(WRAPPER_ROOT)/%.c $(WASM_SYMBOLS) | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(CFLAGS) $(CFLAGS_SORTED_FUNCS) -c -o $@ $<

$(BUILD_QUICKJS)/%.WASM_$(RELEASE)_$(SYNC).o: $(QUICKJS_ROOT)/%.c | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(VARIANT_CFLAGS) $(EMCC_EXPORTED_FUNCS) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_TS)/ffi.$(VARIANT).ts: $(WRAPPER_ROOT)/interface.c generate.ts ts/types-ffi.ts
	$(MKDIRP)
	$(GENERATE_TS) ffi $@

WASM_SYMBOLS=$(BUILD_WRAPPER)/symbols.json $(BUILD_WRAPPER)/asyncify-remove.json $(BUILD_WRAPPER)/asyncify-imports.json
$(BUILD_WRAPPER)/symbols.json:
	$(MKDIRP)
	$(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/asyncify-remove.json:
	$(MKDIRP)
	$(GENERATE_TS) sync-symbols $@

$(BUILD_WRAPPER)/asyncify-imports.json:
	$(MKDIRP)
	$(GENERATE_TS) async-callback-symbols $@

#$(BUILD_WRAPPER)/test.$(VARIANT).exe: $(BUILD_WRAPPER)/test.$(VARIANT).o
#	@echo target: $@, deps: $<, variant: $(VARIANT)
#	@mkdir -p $(dir $@)
#	$(CC) $(VARIANT_CFLAGS) -o $@ $< 
#
#$(BUILD_WRAPPER)/test.%.o:
#	@echo target: $@, deps: $<, variant: $(VARIANT), 
#	@mkdir -p $(dir $@)
#	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -o $@ $< 

# NATIVE_%: build$()

# default: $(VARIANTS)

# release: RELEASE=RELEASE
# release: wasm-RELEASE_SYNC wasm-RELEASE_ASYNCIFY

# debug: RELEASE=DEBUG
# debug: wasm-DEBUG_SYNC wasm-DEBUG_ASYNCIFY

# wasm-DEBUG_SYNC: SYNC=SYNC
# wasm-DEBUG_SYNC: wasm-$(VARIANT)-inner
# 	@echo "Done: $@, variant $(VARIANT)"

# wasm-RELEASE_SYNC: SYNC=SYNC
# wasm-RELEASE_SYNC: wasm-$(VARIANT)-inner
# 	@echo "Done: $@, variant $(VARIANT)"

# wasm-DEBUG_ASYNCIFY: SYNC=ASYNCIFY
# wasm-DEBUG_ASYNCIFY: wasm-$(VARIANT)-inner
# 	@echo "Done $@, variant $(VARIANT)"

# wasm-RELEASE_ASYNCIFY: SYNC=ASYNCIFY
# wasm-RELEASE_ASYNCIFY: wasm-$(VARIANT)-inner
# 	@echo "Done $@, variant $(VARIANT)"

# all: wasm wasm-asyncify native $(BUILD_ROOT)/quickjs.js
# generate: ts/ffi.ts ts/ffi-asyncify.ts
# wasm: $(BUILD_DIR) ts/quickjs.emscripten-module.js ts/ffi.ts
# wasm-asyncify: $(BUILD_DIR) ts/quickjs-asyncify.emscripten-module.js ts/ffi-asyncify.ts
# native: $(BUILD_WRAPPER)/native/test.exe



# imports: examples/imports

# .PHONY: test
# test:
# 	yarn test

# emcc:
# 	docker pull $(EMSDK_DOCKER_IMAGE)

# $(BUILD_WRAPPER): emcc
# 	mkdir -p $(BUILD_WRAPPER)/wasm $(BUILD_WRAPPER)/native $(BUILD_WRAPPER)/wasm-asyncify

# $(BUILD_QUICKJS): emcc
# 	mkdir -p $(BUILD_QUICKJS)/wasm $(BUILD_QUICKJS)/native $(BUILD_QUICKJS)/wasm-asyncify

# $(BUILD_ROOT): $(BUILD_WRAPPER) $(BUILD_QUICKJS)

# $(BUILD_ROOT)/sanitize_test.js: $(WRAPPER_ROOT)/sanitize_test.c
# 	$(EMCC) -fsanitize=leak -s EXPORTED_FUNCTIONS='["___lsan_do_recoverable_leak_check", "_main"]' -o $@ $< 

# # Generated source files
# $(WRAPPER_ROOT)/interface.h: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
# 	$(GENERATE_TS) header $@

# # generate.ts not listed because it changes more often for other reasons
# $(BUILD_WRAPPER)/symbols.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT)
# 	$(GENERATE_TS) symbols $@

# $(BUILD_WRAPPER)/symbols.asyncify.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT) $(BUILD_WRAPPER)/symbols.sync.json
# 	ASYNCIFY=true $(GENERATE_TS) symbols $@
	
# $(BUILD_WRAPPER)/symbols.asyncify-imports.json: $(WRAPPER_ROOT)/interface.c $(BUILD_ROOT) $(BUILD_WRAPPER)/symbols.sync.json
# 	ASYNCIFY=true $(GENERATE_TS) async-callback-symbols $@

# ts/ffi.ts: $(WRAPPER_ROOT)/interface.c ts/types-ffi.ts generate.ts
# 	$(GENERATE_TS) ffi $@
# 	$(PRETTIER) --write $@

# ts/ffi-asyncify.ts: $(WRAPPER_ROOT)/interface.c ts/types-ffi.ts generate.ts
# 	ASYNCIFY=true $(GENERATE_TS) ffi $@
# 	$(PRETTIER) --write $@

# examples/imports: downloadEcmaScriptModules.ts
# 	npx ts-node downloadEcmaScriptModules.ts "https://esm.sh/react@17" "https://esm.sh/react-dom@17/server"
# 	touch examples/imports

# ### Executables
# # The WASM module we'll link to typescript
# ts/quickjs.emscripten-module.js: $(BUILD_WRAPPER)/wasm/interface.o $(QUICKJS_OBJS_WASM)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_WASM) $(CFLAGS_SYNC) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(QUICKJS_OBJS_WASM)

# ts/quickjs-asyncify.emscripten-module.js: $(BUILD_WRAPPER)/wasm-asyncify/interface.o $(QUICKJS_OBJS_WASM_ASYNCIFY)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_WASM) $(CFLAGS_WASM_ASYNCIFY) $(EMCC_EXPORTED_FUNCS_ASYNCIFY) -o $@ $< $(QUICKJS_OBJS_WASM_ASYNCIFY)

# # Trying to debug C...
# $(BUILD_WRAPPER)/native/test.exe: $(BUILD_WRAPPER)/native/test.o $(BUILD_WRAPPER)/native/interface.o $(WRAPPER_ROOT) $(QUICKJS_OBJS_NATIVE)
# 	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -o $@ $< $(BUILD_WRAPPER)/native/interface.o $(QUICKJS_OBJS_NATIVE)

# ### Object files
# # Our wrapper
# $(BUILD_WRAPPER)/wasm/%.o: $(WRAPPER_ROOT)/%.c $(BUILD_WRAPPER)/symbols.json $(BUILD_ROOT)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_SYNC) $(CFLAGS_WASM) $(EMCC_EXPORTED_FUNCS) -c -o $@ $<

# $(BUILD_WRAPPER)/wasm-asyncify/%.o: $(WRAPPER_ROOT)/%.c $(BUILD_WRAPPER)/symbols.asyncify.json $(BUILD_WRAPPER)/symbols.asyncify-imports.json $(BUILD_ROOT)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_WASM) $(CFLAGS_WASM_ASYNCIFY) $(EMCC_EXPORTED_FUNCS) -c -o $@ $<

# $(BUILD_WRAPPER)/native/test.o: $(WRAPPER_ROOT)/test.c $(WRAPPER_ROOT)/interface.h
# 	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -c -o $@ $<

# $(BUILD_WRAPPER)/native/%.o: $(WRAPPER_ROOT)/%.c | $(BUILD_ROOT)
# 	$(CC) $(CFLAGS) $(CFLAGS_SYNC) -c -o $@ $<

# # QuickJS
# $(BUILD_QUICKJS)/wasm/%.o: $(QUICKJS_ROOT)/%.c $(BUILD_ROOT)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_SYNC) $(CFLAGS_WASM) $(QUICKJS_DEFINES) -c -o $@ $<

# $(BUILD_QUICKJS)/wasm-asyncify/%.o: $(QUICKJS_ROOT)/%.c $(BUILD_ROOT)
# 	$(EMCC) $(CFLAGS) $(CFLAGS_WASM) $(CFLAGS_WASM_ASYNCIFY) $(QUICKJS_DEFINES) -c -o $@ $<

# $(BUILD_QUICKJS)/native/%.o: $(QUICKJS_ROOT)/%.c | $(BUILD_ROOT)
#	$(CC) $(CFLAGS) $(CFLAGS_SYNC) $(QUICKJS_DEFINES) -c -o $@ $<
