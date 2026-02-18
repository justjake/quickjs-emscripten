#include "perform_call.h"

QTS_CommandStatus perform_call(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot func_slot, JSValueSlot this_slot, JSValue *argv, uint32_t argc) {
    JSValue func_val = OP_GET_JSVALUE(env, func, "function");
    JSValue this_val = JS_UNDEFINED;
    if (this) this_val = OP_GET_JSVALUE(env, this_val, "this value");

}
