# See QJS_LIB_OBJS in ../quickjs/Makefile
DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(shell cat ../quickjs/VERSION)\"
QJS_ROOT=../quickjs
QJS_LIBS=$(QJS_ROOT)/quickjs.c $(QJS_ROOT)/libregexp.c $(QJS_ROOT)/libunicode.c $(QJS_ROOT)/cutils.c $(QJS_ROOT)/quickjs-libc.c
OUR_LIBS=interface.c
C_SOURCES=$(OUR_LIBS) $(QJS_LIBS)

# See https://emscripten.org/docs/tools_reference/emcc.html
CFLAGS+=--closure 1
CFLAGS+=-O2

# See https://github.com/emscripten-core/emscripten/blob/master/src/settings.js
SETTINGS:=-s WASM=1
SETTINGS+=-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
SETTINGS+=-s EXPORTED_FUNCTIONS='["_eval"]'
SETTINGS+=-s NODEJS_CATCH_EXIT=0
SETTINGS+=-s SINGLE_FILE=1
SETTINGS+=-s MODULARIZE=1
SETTINGS+=-s EXPORT_NAME=QuickJSRaw
SETTINGS+=-s ASSERTIONS=1
# Don't run main()
SETTINGS+=-s INVOKE_RUN=0
# We're an interrprerter... need more mem
# This also lets us see stack explosions and bugs during development...
SETTINGS+=-s ALLOW_MEMORY_GROWTH=1
# Should we turn this on? We'll need to check `strdup`...
# QuickJS should hanlde this gracefully...
# SETTINGS+=-s ABORTING_MALLOC=0

quickjs-emscripten-module.js: Makefile $(C_SOURCES)
	emcc \
		$(SETTINGS) \
		$(CFLAGS) \
		$(DEFINES) \
		-o $@ \
		$(C_SOURCES)

clean:
	rm -f quickjs-emscripten-module.js
