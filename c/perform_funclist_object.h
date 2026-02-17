// Generated - do not edit
#ifndef QTS_PERFORM_FUNCLIST_OBJECT_H
#define QTS_PERFORM_FUNCLIST_OBJECT_H

#include "op.h"

/** Set funclist entry to JS_DEF_OBJECT (nested object with its own funclist) */
QTS_CommandStatus perform_funclist_object(QTS_CommandEnv*env, FuncListSlot list, JSPropFlags flags, uint32_t index, uint32_t name_ptr, uint32_t nested_packed);

#endif // QTS_PERFORM_FUNCLIST_OBJECT_H
