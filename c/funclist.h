#ifndef QTS_FUNCLIST_H
#define QTS_FUNCLIST_H

#include "quickjs.h"

typedef struct QTS_FuncList {
  uint32_t count;
  JSCFunctionListEntry *entries;
} QTS_FuncList;

#endif // QTS_FUNCLIST_H