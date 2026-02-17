// Generated - do not edit
#ifndef QTS_PERFORM_FUNCLIST_CGETSET_H
#define QTS_PERFORM_FUNCLIST_CGETSET_H

#include "op.h"

/** Set funclist entry to JS_DEF_CGETSET */
QTS_CommandStatus perform_funclist_cgetset(QTS_CommandEnv*env, FuncListSlot list, JSPropFlags flags, uint32_t index, uint32_t name_ptr, uint32_t getter_setter_packed);

#endif // QTS_PERFORM_FUNCLIST_CGETSET_H
