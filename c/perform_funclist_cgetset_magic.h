// Generated - do not edit
#ifndef QTS_PERFORM_FUNCLIST_CGETSET_MAGIC_H
#define QTS_PERFORM_FUNCLIST_CGETSET_MAGIC_H

#include "op.h"

/** Set funclist entry to JS_DEF_CGETSET_MAGIC */
QTS_CommandStatus perform_funclist_cgetset_magic(QTS_CommandEnv*env, FuncListSlot list, JSPropFlags flags, uint8_t magic, uint32_t index, uint32_t name_ptr, uint32_t getter_setter_packed);

#endif // QTS_PERFORM_FUNCLIST_CGETSET_MAGIC_H
