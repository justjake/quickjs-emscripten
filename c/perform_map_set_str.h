// Generated - do not edit
#ifndef QTS_PERFORM_MAP_SET_STR_H
#define QTS_PERFORM_MAP_SET_STR_H

#include "op.h"

/** Call map.set(key, value) with string key */
QTS_CommandStatus perform_map_set_str(QTS_CommandEnv*env, JSValueSlot map, JSValueSlot val, char*key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_MAP_SET_STR_H
