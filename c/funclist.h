#ifndef QTS_FUNCLIST_H
#define QTS_FUNCLIST_H

#ifdef QTS_USE_QUICKJS_NG
#include "../vendor/quickjs-ng/quickjs.h"
#else
#include "../vendor/quickjs/quickjs.h"
#endif

typedef struct QTS_FuncList {
  uint32_t count;
  JSCFunctionListEntry *entries;
} QTS_FuncList;

#endif // QTS_FUNCLIST_H