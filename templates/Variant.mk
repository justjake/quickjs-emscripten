# Tools
EMSDK_VERSION=REPLACE_EMSDK_VERSION
EMSDK_DOCKER_IMAGE=emscripten/emsdk:$(EMSDK_VERSION)
EMCC_SRC=../../scripts/emcc.sh
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) EMSDK_PROJECT_ROOT=$(REPO_ROOT) EMSDK_DOCKER_CACHE=$(REPO_ROOT)/emsdk-cache/$(EMSDK_VERSION) $(EMCC_SRC)
GENERATE_TS=$(GENERATE_TS_ENV) ../../scripts/generate.ts
THIS_DIR := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))
REPO_ROOT := $(abspath $(THIS_DIR)/../..)

QUICKJS_LIB=REPLACE_THIS

# Paths
QUICKJS_ROOT=../../vendor/$(QUICKJS_LIB)
WRAPPER_ROOT=../../c
TEMPLATES=../../templates
# Intermediate build files
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs
# Distributed to users
DIST=dist

# QuickJS
ifeq ($(QUICKJS_LIB),quickjs-ng)
	# quickjs-ng uses amalgamated build (single source file)
	# QJS_BUILD_LIBC is needed to include libc functions (js_std_*)
	QUICKJS_OBJS=quickjs-amalgam.o
	QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
	QUICKJS_DEFINES:=-D_GNU_SOURCE -DQJS_BUILD_LIBC -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\"
	CFLAGS_COMPILE+=-DQTS_USE_QUICKJS_NG
else
	# bellard/quickjs uses separate source files
	QUICKJS_OBJS=quickjs.o dtoa.o libregexp.o libunicode.o cutils.o quickjs-libc.o
	QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
	QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\" -DCONFIG_STACK_CHECK
endif
VARIANT_QUICKJS_OBJS=$(patsubst %.o, $(BUILD_QUICKJS)/%.o, $(QUICKJS_OBJS))

# quickjs-emscripten
WRAPPER_DEFINES+=-Wcast-function-type   # Likewise, warns about some quickjs casts we don't control.
EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.json
EMCC_EXPORTED_FUNCS_ASYNCIFY+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.asyncify.json

###############################################################################
# Emscripten flag separation:
# - CFLAGS_COMPILE: Used during .c -> .o compilation (optimization, defines, debug info)
# - LDFLAGS_WASM: Used only during .o -> .js linking (emscripten settings, exports, pre-js)
# - Combined for link step via $(CFLAGS_COMPILE) $(LDFLAGS_WASM)
###############################################################################

# Emscripten linker-only options
LDFLAGS_WASM+=-s MODULARIZE=1
LDFLAGS_WASM+=-s IMPORTED_MEMORY=1
LDFLAGS_WASM+=-s EXPORT_NAME=QuickJSRaw
LDFLAGS_WASM+=-s INVOKE_RUN=0
LDFLAGS_WASM+=-s ALLOW_MEMORY_GROWTH=1
LDFLAGS_WASM+=-s ALLOW_TABLE_GROWTH=1
LDFLAGS_WASM+=-s STACK_SIZE=5MB
LDFLAGS_WASM+=-s SUPPORT_ERRNO=0

# Emscripten linker options - like STRICT
# https://github.com/emscripten-core/emscripten/blob/fa339b76424ca9fbe5cf15faea0295d2ac8d58cc/src/settings.js#L1095-L1109
LDFLAGS_WASM+=-s IGNORE_MISSING_MAIN=0 --no-entry
LDFLAGS_WASM+=-s AUTO_JS_LIBRARIES=0
LDFLAGS_WASM+=-lccall.js
LDFLAGS_WASM+=-s AUTO_NATIVE_LIBRARIES=0
LDFLAGS_WASM+=-s AUTO_ARCHIVE_INDEXES=0
LDFLAGS_WASM+=-s DEFAULT_TO_CXX=0
LDFLAGS_WASM+=-s ALLOW_UNIMPLEMENTED_SYSCALLS=0

# Emscripten linker options - ESM exports
LDFLAGS_MJS+=-s EXPORT_ES6=1
LDFLAGS_BROWSER+=-s EXPORT_ES6=1

# VARIANT
SYNC=REPLACE_THIS

# Set EXPORTED_RUNTIME_METHODS based on sync mode (Asyncify only available in asyncify builds)
ifeq ($(SYNC),ASYNCIFY)
LDFLAGS_WASM+=-s EXPORTED_RUNTIME_METHODS=@../../exportedRuntimeMethods.asyncify.json
else
LDFLAGS_WASM+=-s EXPORTED_RUNTIME_METHODS=@../../exportedRuntimeMethods.json
endif

# Variant-specific compiler flags (appended to CFLAGS_COMPILE by prepareVariants.ts)
CFLAGS_COMPILE_VARIANT=REPLACE_THIS

# Variant-specific linker flags (appended to LDFLAGS_WASM by prepareVariants.ts)
LDFLAGS_VARIANT=REPLACE_THIS

# Emscripten options - target specific linker flags
LDFLAGS_CJS=REPLACE_THIS
LDFLAGS_MJS=REPLACE_THIS
LDFLAGS_BROWSER=REPLACE_THIS
LDFLAGS_CLOUDFLARE=REPLACE_THIS

# GENERATE_TS options - variant specific
GENERATE_TS_ENV_VARIANT=REPLACE_THIS


ifdef DEBUG_MAKE
	MKDIRP=@echo "\n=====[["" target: $@, deps: $<, variant: $(VARIANT) ""]]=====" ; mkdir -p $(dir $@)
else
	MKDIRP=@mkdir -p $(dir $@)
endif

###############################################################################
# High-level
all: EXPORTS

clean:
	git clean -fx $(DIST) $(BUILD_ROOT)

###############################################################################
# Emscripten output targets
EXPORTS: __REPLACE_THIS__
CJS: $(DIST)/emscripten-module.cjs $(DIST)/emscripten-module.d.ts
MJS: $(DIST)/emscripten-module.mjs $(DIST)/emscripten-module.d.ts
BROWSER: $(DIST)/emscripten-module.browser.mjs $(DIST)/emscripten-module.browser.d.ts
CLOUDFLARE: $(DIST)/emscripten-module.cloudflare.cjs $(DIST)/emscripten-module.cloudflare.d.ts

$(DIST)/emscripten-module.mjs: LDFLAGS_TARGET=$(LDFLAGS_MJS)
$(DIST)/emscripten-module.mjs: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_COMPILE) $(LDFLAGS_WASM) $(LDFLAGS_TARGET) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

$(DIST)/emscripten-module.cjs: LDFLAGS_TARGET=$(LDFLAGS_CJS)
$(DIST)/emscripten-module.cjs: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_COMPILE) $(LDFLAGS_WASM) $(LDFLAGS_TARGET) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

$(DIST)/emscripten-module.d.ts: $(TEMPLATES)/emscripten-module.$(SYNC).d.ts
	$(MKDIRP)
	echo '// Generated from $<' > $@
	cat $< >> $@

$(DIST)/emscripten-module%.d.ts: $(TEMPLATES)/emscripten-module.$(SYNC).d.ts
	$(MKDIRP)
	echo '// Generated from $<' > $@
	cat $< >> $@

# Browser target needs intermediate build to avoid two copies of .wasm
$(DIST)/emscripten-module.%.mjs: $(BUILD_WRAPPER)/%/emscripten-module.js
	$(MKDIRP)
	if [ -e $(basename $<).wasm ] ; then cp -v $(basename $<).wasm* $(dir $@); fi
	cp $< $@

$(DIST)/emscripten-module.%.cjs: $(BUILD_WRAPPER)/%/emscripten-module.js
	$(MKDIRP)
	if [ -e $(basename $<).wasm ] ; then cp -v $(basename $<).wasm* $(dir $@); fi
	cp $< $@

$(BUILD_WRAPPER)/browser/emscripten-module.js: LDFLAGS_TARGET=$(LDFLAGS_BROWSER)
$(BUILD_WRAPPER)/cloudflare/emscripten-module.js: LDFLAGS_TARGET=$(LDFLAGS_CLOUDFLARE)
$(BUILD_WRAPPER)/%/emscripten-module.js: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_COMPILE) $(LDFLAGS_WASM) $(LDFLAGS_TARGET) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

###############################################################################
# Emscripten intermediate files (.c -> .o compilation uses only compiler flags)
WASM_SYMBOLS=$(BUILD_WRAPPER)/symbols.json $(BUILD_WRAPPER)/asyncify-remove.json $(BUILD_WRAPPER)/asyncify-imports.json
$(BUILD_WRAPPER)/%.o: $(WRAPPER_ROOT)/%.c $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_COMPILE) $(WRAPPER_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/%.o: $(QUICKJS_ROOT)/%.c $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_COMPILE) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_WRAPPER)/symbols.json:
	$(MKDIRP)
	$(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/asyncify-remove.json:
	$(MKDIRP)
	$(GENERATE_TS) sync-symbols $@

$(BUILD_WRAPPER)/asyncify-imports.json:
	$(MKDIRP)
	$(GENERATE_TS) async-callback-symbols $@
