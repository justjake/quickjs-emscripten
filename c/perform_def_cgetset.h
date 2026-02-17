// Generated - do not edit
#ifndef QTS_PERFORM_DEF_CGETSET_H
#define QTS_PERFORM_DEF_CGETSET_H

#include "op.h"

/** Define a host getter/setter property on object (name must be null-terminated) */
QTS_CommandStatus perform_def_cgetset(QTS_CommandEnv*env, JSValueSlot obj, JSPropFlags flags, uint32_t name_ptr, int32_t getter_ref, int32_t setter_ref);

#endif // QTS_PERFORM_DEF_CGETSET_H
