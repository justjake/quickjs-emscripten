// Generated - do not edit
#ifndef QTS_PERFORM_FUNCLIST_CGETSET_H
#define QTS_PERFORM_FUNCLIST_CGETSET_H

#include "command.h"

/** Set funclist entry to JS_DEF_CGETSET */
QTS_CommandStatus perform_funclist_cgetset(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, char *name_ptr, JSCFunctionType *getter_ptr, JSCFunctionType *setter_ptr);

#endif // QTS_PERFORM_FUNCLIST_CGETSET_H
