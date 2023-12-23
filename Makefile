# Tools
CC=clang
EMSDK_VERSION=3.1.48
EMSDK_DOCKER_IMAGE=emscripten/emsdk:3.1.48
EMCC=EMSDK_VERSION=$(EMSDK_VERSION) EMSDK_DOCKER_IMAGE=$(EMSDK_DOCKER_IMAGE) EMSDK_DOCKER_CACHE=$(THIS_DIR)/emsdk-cache/$(EMSDK_VERSION) scripts/emcc.sh
GENERATE_TS=npx tsx generate.ts
PRETTIER=npx prettier
THIS_DIR := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

DEBUG_MAKE=1

# Paths
QUICKJS_ROOT=quickjs
WRAPPER_ROOT=c
BUILD_ROOT=build
BUILD_WRAPPER=$(BUILD_ROOT)/wrapper
BUILD_QUICKJS=$(BUILD_ROOT)/quickjs
BUILD_TS=ts/generated
FFI_TYPES=packages/quickjs-ffi-types

# QuickJS
QUICKJS_OBJS=quickjs.o libregexp.o libunicode.o cutils.o quickjs-libc.o libbf.o
QUICKJS_CONFIG_VERSION=$(shell cat $(QUICKJS_ROOT)/VERSION)
QUICKJS_DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(QUICKJS_CONFIG_VERSION)\" -DCONFIG_STACK_CHECK -DCONFIG_BIGNUM
VARIANT_QUICKJS_OBJS=$(patsubst %.o, $(BUILD_QUICKJS)/%.$(VARIANT).o, $(QUICKJS_OBJS))

ifdef DEBUG_MAKE
	MKDIRP=@echo "\n=====[["" target: $@, deps: $<, variant: $(VARIANT) ""]]=====" ; mkdir -p $(dir $@)
else
	MKDIRP=@mkdir -p $(dir $@)
endif


# $(error debug $(call varsForVariant,CFLAGS))
# $(error debug $(call forVariant,CFLAGS))

###############################################################################
# High level targets

all: generate
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

generate: $(FFI_TYPES)/ffi.ts $(FFI_TYPES)/ffi-asyncify.ts

$(FFI_TYPES)/ffi.ts: $(WRAPPER_ROOT)/interface.c generate.ts $(FFI_TYPES)/ffi-types.ts 
	TYPE_ONLY=true $(GENERATE_TS) ffi $@

$(FFI_TYPES)/ffi-asyncify.ts: $(WRAPPER_ROOT)/interface.c generate.ts $(FFI_TYPES)/ffi-types.ts 
	TYPE_ONLY=true ASYNCIFY=true $(GENERATE_TS) ffi $@