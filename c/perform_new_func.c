#include "perform_new_func.h"

/**
 * Create a host function (QTS_NewFunction)
 * @param env Command execution environment
 * @param result_slot Slot to store the function
 * @param arity Function.length (arity)
 * @param is_constructor 1 if callable as constructor
 * @param name_ptr Pointer to function name
 * @param name_len Length of function name
 * @param host_ref_id Host reference ID for callback
 */
QTS_CommandStatus perform_new_func(QTS_CommandEnv *env, JSValueSlot result_slot, uint8_t arity, uint8_t is_constructor, char *name_ptr, uint32_t name_len, HostRefId host_ref_id) {
    OP_UNIMPLEMENTED(env, "perform_new_func");
}
