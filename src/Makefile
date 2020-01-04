# See QJS_LIB_OBJS in ../quickjs/Makefile
QJS_ROOT=../quickjs

CONFIG_VERSION=$(shell cat $(QJS_ROOT)/VERSION)
DEFINES:=-D_GNU_SOURCE -DCONFIG_VERSION=\"$(CONFIG_VERSION)\"

QJS_LIBS=$(QJS_ROOT)/quickjs.c $(QJS_ROOT)/libregexp.c $(QJS_ROOT)/libunicode.c $(QJS_ROOT)/cutils.c $(QJS_ROOT)/quickjs-libc.c
OUR_LIBS=interface.c
C_SOURCES=$(OUR_LIBS) $(QJS_LIBS)

# See https://emscripten.org/docs/tools_reference/emcc.html
CFLAGS+=$(DEFINES)

# See https://github.com/emscripten-core/emscripten/blob/master/src/settings.js
SETTINGS+=-s WASM=1
SETTINGS+=-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
SETTINGS+=-s EXPORTED_FUNCTIONS='["_eval"]'
SETTINGS+=-s NODEJS_CATCH_EXIT=0
SETTINGS+=-s MODULARIZE=1
SETTINGS+=-s EXPORT_NAME=QuickJSRaw
SETTINGS+=-s INVOKE_RUN=0
SETTINGS+=-s ALLOW_MEMORY_GROWTH=1
ifdef DEBUG
CFLAGS+=-O0
CFLAGS+=-g4
SETTINGS+=-s ASSERTIONS=1
else
CFLAGS+=-O3
SETTINGS+=-s SINGLE_FILE=1
SETTINGS+=--closure 1
endif
# Don't run main()
# We're an interrprerter... need more mem
# This also lets us see stack explosions and bugs during development...
# Should we turn this on? We'll need to check `strdup`...
# QuickJS should hanlde this gracefully...
# SETTINGS+=-s ABORTING_MALLOC=0


OBJDIR=.obj
QJS_OBJDIR=$(QJS_ROOT)/$(OBJDIR)
QJS_LIB_OBJS=$(OBJDIR)/quickjs.o $(OBJDIR)/libregexp.o $(OBJDIR)/libunicode.o $(OBJDIR)/cutils.o $(OBJDIR)/quickjs-libc.o
RELATIVE_LIB_OBJS=$(QJS_OBJDIR)/quickjs.o $(QJS_OBJDIR)/libregexp.o $(QJS_OBJDIR)/libunicode.o $(QJS_OBJDIR)/cutils.o $(QJS_OBJDIR)/quickjs-libc.o

MODULE=quickjs-emscripten-module.js
$(MODULE): interface.c Makefile $(RELATIVE_LIB_OBJS)
	emcc \
		$(SETTINGS) \
		$(CFLAGS) \
		$(DEFINES) \
		-o $@ \
		$< \
		$(RELATIVE_LIB_OBJS)

# https://emscripten.org/docs/compiling/Building-Projects.html
$(RELATIVE_LIB_OBJS):
	cd $(QJS_ROOT) && emmake make $(QJS_LIB_OBJS) CC=emcc CFLAGS_OPT='$(CFLAGS)'

clean:
	rm -f $(MODULE)
	cd $(QJS_ROOT) && emmake make clean
