# Tools
CC=clang
EMSDK_VERSION=3.1.35
EMSDK_DOCKER_IMAGE=emscripten/emsdk:3.1.35
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) EMSDK_DOCKER_CACHE=$(THIS_DIR)/emsdk-cache/$(EMSDK_VERSION) scripts/emcc.sh
GENERATE_TS=$(VARIANT_GENERATE_TS_ENV) npx ts-node generate.ts
PRETTIER=npx prettier
THIS_DIR := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

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


# This macro handles finding all the related config for a varying variable.
variantCombinations = $(PLATFORM) $(RELEASE) $(SYNC) $(PLATFORM)_$(RELEASE) $(PLATFORM)_$(SYNC) $(RELEASE)_$(SYNC) $(VARIANT)
varsForVariant = $(addprefix $(1)_,$(variantCombinations))
forVariant = $(foreach VAR,$(call varsForVariant,$(1)),$($(VAR)))

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
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\" -DCONFIG_STACK_CHECK -DCONFIG_BIGNUM
VARIANT_QUICKJS_OBJS=$(patsubst %.o, $(BUILD_QUICKJS)/%.$(VARIANT).o, $(QUICKJS_OBJS))

# quickjs-emscripten
WRAPPER_DEFINES+=-Wcast-function-type   # Likewise, warns about some quickjs casts we don't control.
EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.json
EMCC_EXPORTED_FUNCS_ASYNCIFY+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.asyncify.json

# Emscripten options
CFLAGS_WASM+=-s WASM=1
CFLAGS_WASM+=-s EXPORTED_RUNTIME_METHODS=@exportedRuntimeMethods.json
CFLAGS_WASM+=-s MODULARIZE=1
CFLAGS_WASM+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_WASM+=-s INVOKE_RUN=0
CFLAGS_WASM+=-s ALLOW_MEMORY_GROWTH=1
CFLAGS_WASM+=-s ALLOW_TABLE_GROWTH=1
CFLAGS_WASM+=-s STACK_SIZE=5MB
# CFLAGS_WASM+=-s MINIMAL_RUNTIME=1 # Appears to break MODULARIZE
CFLAGS_WASM+=-s SUPPORT_ERRNO=0

# Emscripten options - like STRICT
# https://github.com/emscripten-core/emscripten/blob/fa339b76424ca9fbe5cf15faea0295d2ac8d58cc/src/settings.js#L1095-L1109
# CFLAGS_WASM+=-s STRICT_JS=1 # Doesn't work with MODULARIZE
CFLAGS_WASM+=-s IGNORE_MISSING_MAIN=0 --no-entry
CFLAGS_WASM+=-s AUTO_JS_LIBRARIES=0
CFLAGS_WASM+=-s -lccall.js
CFLAGS_WASM+=-s AUTO_NATIVE_LIBRARIES=0
CFLAGS_WASM+=-s AUTO_ARCHIVE_INDEXES=0
CFLAGS_WASM+=-s DEFAULT_TO_CXX=0
CFLAGS_WASM+=-s ALLOW_UNIMPLEMENTED_SYSCALLS=0

# Emscripten options - NodeJS
CFLAGS_WASM+=-s MIN_NODE_VERSION=160000
CFLAGS_WASM+=-s NODEJS_CATCH_EXIT=0

# Empscripten options for asyncify variant
# https://emscripten.org/docs/porting/asyncify.html
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY=1
CFLAGS_WASM_ASYNCIFY+=-DQTS_ASYNCIFY=1
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY_STACK_SIZE=81920
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json
CFLAGS_WASM_ASYNCIFY+=-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json
CFLAGS_WASM_ASYNCIFY+=-lasync.js
GENERATE_TS_ENV_ASYNCIFY+=ASYNCIFY=true

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
VARIANT_GENERATE_TS_ENV=$(call forVariant,GENERATE_TS_ENV)
VARIANT_CFLAGS=$(call forVariant,CFLAGS)

ifdef DEBUG_MAKE
	MKDIRP=@echo "\n=====[["" target: $@, deps: $<, variant: $(VARIANT) ""]]=====" ; mkdir -p $(dir $@)
else
	MKDIRP=@mkdir -p $(dir $@)
endif


# $(error debug $(call varsForVariant,CFLAGS))
# $(error debug $(call forVariant,CFLAGS))

###############################################################################
# High level targets

wasm: $(WASM_VARIANTS)
all: $(VARIANTS)
dist: wasm tsconfig.json
	rm -rf dist
	yarn run tsc
	cp -v ts/generated/*.wasm ts/generated/*.wasm.map dist/generated

.PHONY: test prettier
test:
	yarn test
prettier:
	yarn prettier

doc: prettier ts/* ts/generated/*.ts
	yarn doc
	touch doc

build/quickjs-emscripten.tgz: dist
	yarn pack --filename build/quickjs-emscripten.tgz

emcc: scripts/emcc.sh
	docker pull $(EMSDK_DOCKER_IMAGE)

scripts/emcc.sh:
	docker pull $(EMSDK_DOCKER_IMAGE)
	touch scripts/emcc.sh

examples/imports: downloadEcmaScriptModules.ts
	npx ts-node downloadEcmaScriptModules.ts "https://esm.sh/react@17" "https://esm.sh/react-dom@17/server"
	touch examples/imports

clean-generate:
	rm -rfv $(BUILD_TS)

clean: clean-generate
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
$(VARIANTS): %: | emcc
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
WASM: $(BUILD_TS)/emscripten-module.$(VARIANT).js $(BUILD_TS)/emscripten-module.$(VARIANT).d.ts GENERATE
GENERATE: $(BUILD_TS)/ffi.$(VARIANT).ts
WASM_SYMBOLS=$(BUILD_WRAPPER)/symbols.json $(BUILD_WRAPPER)/asyncify-remove.json $(BUILD_WRAPPER)/asyncify-imports.json

$(BUILD_TS)/emscripten-module.$(VARIANT).js: $(BUILD_WRAPPER)/interface.$(VARIANT).o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(VARIANT_CFLAGS) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

$(BUILD_TS)/emscripten-module.$(VARIANT).d.ts: ts/types-generated/emscripten-module.$(SYNC).d.ts
	echo '// Generated from $<' > $@
	cat $< >> $@

$(BUILD_WRAPPER)/%.WASM_$(RELEASE)_$(SYNC).o: $(WRAPPER_ROOT)/%.c $(WASM_SYMBOLS) | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(VARIANT_CFLAGS) $(CFLAGS_SORTED_FUNCS) $(WRAPPER_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/%.WASM_$(RELEASE)_$(SYNC).o: $(QUICKJS_ROOT)/%.c $(WASM_SYMBOLS) | scripts/emcc.sh
	$(MKDIRP)
	$(EMCC) $(VARIANT_CFLAGS) $(EMCC_EXPORTED_FUNCS) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_TS)/ffi.$(VARIANT).ts: $(WRAPPER_ROOT)/interface.c generate.ts ts/types-ffi.ts
	$(MKDIRP)
	$(GENERATE_TS) ffi $@

$(BUILD_WRAPPER)/symbols.json:
	$(MKDIRP)
	$(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/asyncify-remove.json:
	$(MKDIRP)
	$(GENERATE_TS) sync-symbols $@

$(BUILD_WRAPPER)/asyncify-imports.json:
	$(MKDIRP)
	$(GENERATE_TS) async-callback-symbols $@
