// Generated - do not edit
#ifndef QTS_PERFORM_FUNCLIST_OBJECT_H
#define QTS_PERFORM_FUNCLIST_OBJECT_H

#include "command.h"

/** Set funclist entry to JS_DEF_OBJECT (nested object with its own funclist) */
QTS_CommandStatus perform_funclist_object(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint32_t index, char *name_ptr, Uint16Pair nested_packed);

#endif // QTS_PERFORM_FUNCLIST_OBJECT_H
