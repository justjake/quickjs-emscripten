// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_FUNCLIST_DEF_CFUNC_H
#define QTS_PERFORM_FUNCLIST_DEF_CFUNC_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_CFUNC
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param arity Function.length (arity)
 * @param flags JS_PROP_* property flags
 * @param index Index to set in the target funclist (uint32_t)
 * @param func_name_ptr Function name, MUST be null-terminated
 * @param c_func_ptr Pointer to C function implementing one of JSFunctionType (*not* a HostRef, this is a raw function pointer)
 */
QTS_CommandStatus perform_funclist_def_cfunc(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t arity, JSPropFlags flags, uint32_t index, char *func_name_ptr, JSCFunctionType *c_func_ptr);

#endif // QTS_PERFORM_FUNCLIST_DEF_CFUNC_H
