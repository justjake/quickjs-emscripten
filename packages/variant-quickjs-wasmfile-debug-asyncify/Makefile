# Tools
EMSDK_VERSION=3.1.64
EMSDK_DOCKER_IMAGE=emscripten/emsdk:3.1.64
EMCC_SRC=../../scripts/emcc.sh
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) EMSDK_PROJECT_ROOT=$(REPO_ROOT) EMSDK_DOCKER_CACHE=$(REPO_ROOT)/emsdk-cache/$(EMSDK_VERSION) $(EMCC_SRC)
GENERATE_TS=$(GENERATE_TS_ENV) ../../scripts/generate.ts
THIS_DIR := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))
REPO_ROOT := $(abspath $(THIS_DIR)/../..)

QUICKJS_LIB=quickjs

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
QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o libbf.o
ifeq ($(QUICKJS_LIB),quickjs-ng)
	QUICKJS_DEFINES:=-D_GNU_SOURCE
	CFLAGS_WASM+=-DQTS_USE_QUICKJS_NG
else
	QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
	QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\" -DCONFIG_STACK_CHECK -DCONFIG_BIGNUM
	CFLAGS_WASM+=-DCONFIG_BIGNUM
endif
VARIANT_QUICKJS_OBJS=$(patsubst %.o, $(BUILD_QUICKJS)/%.o, $(QUICKJS_OBJS))

# quickjs-emscripten
WRAPPER_DEFINES+=-Wcast-function-type   # Likewise, warns about some quickjs casts we don't control.
EMCC_EXPORTED_FUNCS+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.json
EMCC_EXPORTED_FUNCS_ASYNCIFY+=-s EXPORTED_FUNCTIONS=@$(BUILD_WRAPPER)/symbols.asyncify.json

# Emscripten options
CFLAGS_WASM+=-s EXPORTED_RUNTIME_METHODS=@../../exportedRuntimeMethods.json
CFLAGS_WASM+=-s MODULARIZE=1
CFLAGS_WASM+=-s IMPORTED_MEMORY=1 # Allow passing WASM memory to Emscripten
CFLAGS_WASM+=-s EXPORT_NAME=QuickJSRaw
CFLAGS_WASM+=-s INVOKE_RUN=0
CFLAGS_WASM+=-s ALLOW_MEMORY_GROWTH=1
CFLAGS_WASM+=-s ALLOW_TABLE_GROWTH=1
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

CFLAGS_MJS+=-s EXPORT_ES6=1
CFLAGS_BROWSER+=-s EXPORT_ES6=1

# VARIANT
SYNC=ASYNCIFY
CFLAGS_WASM_BROWSER=$(CFLAGS_WASM)

# Emscripten options - variant & target specific
CFLAGS_WASM+=-s ASYNCIFY=1
CFLAGS_WASM+=-DQTS_ASYNCIFY=1
CFLAGS_WASM+=-DQTS_ASYNCIFY_DEFAULT_STACK_SIZE=81920
CFLAGS_WASM+=-s ASYNCIFY_STACK_SIZE=81920
CFLAGS_WASM+=-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json
CFLAGS_WASM+=-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json
CFLAGS_WASM+=-lasync.js
CFLAGS_WASM+=-O0
CFLAGS_WASM+=-DQTS_DEBUG_MODE
CFLAGS_WASM+=-DDUMP_LEAKS=1
CFLAGS_WASM+=-gsource-map
CFLAGS_WASM+=-s ASSERTIONS=1
CFLAGS_WASM+=--pre-js $(TEMPLATES)/pre-extension.js
CFLAGS_WASM+=--pre-js $(TEMPLATES)/pre-sourceMapJson.js
CFLAGS_WASM+=--pre-js $(TEMPLATES)/pre-wasmOffsetConverter.js
CFLAGS_WASM+=--pre-js $(TEMPLATES)/pre-wasmMemory.js
CFLAGS_WASM+=-s STACK_SIZE=5MB
CFLAGS_WASM+=-O3
CFLAGS_CJS+=-s ENVIRONMENT=node
CFLAGS_MJS+=-s ENVIRONMENT=node
CFLAGS_BROWSER+=-s ENVIRONMENT=web,worker
CFLAGS_CLOUDFLARE+=-s ENVIRONMENT=web

# GENERATE_TS options - variant specific
GENERATE_TS_ENV+=ASYNCIFY=true
GENERATE_TS_ENV+=DEBUG=true


ifdef DEBUG_MAKE
	MKDIRP=@echo "\n=====[["" target: $@, deps: $<, variant: $(VARIANT) ""]]=====" ; mkdir -p $(dir $@)
else
	MKDIRP=@mkdir -p $(dir $@)
	CFLAGS+=-Wunused-command-line-argument=0
endif

###############################################################################
# High-level
all: EXPORTS

clean:
	git clean -fx $(DIST) $(BUILD_ROOT)

###############################################################################
# Emscripten output targets
EXPORTS: BROWSER MJS CJS CLOUDFLARE
CJS: $(DIST)/emscripten-module.cjs $(DIST)/emscripten-module.d.ts
MJS: $(DIST)/emscripten-module.mjs $(DIST)/emscripten-module.d.ts
BROWSER: $(DIST)/emscripten-module.browser.mjs $(DIST)/emscripten-module.browser.d.ts
CLOUDFLARE: $(DIST)/emscripten-module.cloudflare.cjs $(DIST)/emscripten-module.cloudflare.d.ts

$(DIST)/emscripten-module.mjs: CFLAGS_WASM+=$(CFLAGS_ESM)
$(DIST)/emscripten-module.mjs: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_WASM) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

$(DIST)/emscripten-module.cjs: CFLAGS_WASM+=$(CFLAGS_CJS)
$(DIST)/emscripten-module.cjs: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_WASM) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

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

$(BUILD_WRAPPER)/browser/emscripten-module.js: CFLAGS_WASM+=$(CFLAGS_BROWSER)
$(BUILD_WRAPPER)/cloudflare/emscripten-module.js: CFLAGS_WASM+=$(CFLAGS_CLOUDFLARE)
$(BUILD_WRAPPER)/%/emscripten-module.js: $(BUILD_WRAPPER)/interface.o $(VARIANT_QUICKJS_OBJS) $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_WASM) $(WRAPPER_DEFINES) $(EMCC_EXPORTED_FUNCS) -o $@ $< $(VARIANT_QUICKJS_OBJS)

###############################################################################
# Emscripten intermediate files
WASM_SYMBOLS=$(BUILD_WRAPPER)/symbols.json $(BUILD_WRAPPER)/asyncify-remove.json $(BUILD_WRAPPER)/asyncify-imports.json
$(BUILD_WRAPPER)/%.o: $(WRAPPER_ROOT)/%.c $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_WASM) $(WRAPPER_DEFINES) -c -o $@ $<

$(BUILD_QUICKJS)/%.o: $(QUICKJS_ROOT)/%.c $(WASM_SYMBOLS) | $(EMCC_SRC)
	$(MKDIRP)
	$(EMCC) $(CFLAGS_WASM) $(QUICKJS_DEFINES) -c -o $@ $<

$(BUILD_WRAPPER)/symbols.json:
	$(MKDIRP)
	$(GENERATE_TS) symbols $@

$(BUILD_WRAPPER)/asyncify-remove.json:
	$(MKDIRP)
	$(GENERATE_TS) sync-symbols $@

$(BUILD_WRAPPER)/asyncify-imports.json:
	$(MKDIRP)
	$(GENERATE_TS) async-callback-symbols $@
