/*
 * Micro QuickJS build utility
 *
 * Copyright (c) 2017-2025 Fabrice Bellard
 * Copyright (c) 2017-2025 Charlie Gordon
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
#ifndef MQUICKJS_BUILD_H
#define MQUICKJS_BUILD_H

#include <stdlib.h>
#include <inttypes.h>

enum {
    JS_DEF_END,
    JS_DEF_CFUNC,
    JS_DEF_CGETSET,
    JS_DEF_PROP_DOUBLE,
    JS_DEF_PROP_UNDEFINED,
    JS_DEF_PROP_STRING,
    JS_DEF_PROP_NULL,
    JS_DEF_CLASS,
};

typedef struct JSClassDef JSClassDef;

typedef struct JSPropDef {
    int def_type;
    const char *name;
    union {
        struct {
            uint8_t length;
            const char *magic;
            const char *cproto_name;
            const char *func_name;
        } func;
        struct {
            const char *magic;
            const char *cproto_name;
            const char *get_func_name;
            const char *set_func_name;
        } getset;
        double f64;
        const JSClassDef *class1;
        const char *str;
    } u;
} JSPropDef;

typedef struct JSClassDef {
    const char *name;
    int length;
    const char *cproto_name;
    const char *func_name;
    const char *class_id;
    const JSPropDef *class_props; /* NULL if none */
    const JSPropDef *proto_props; /* NULL if none */
    const JSClassDef *parent_class; /* NULL if none */
    const char *finalizer_name; /* "NULL" if none */
} JSClassDef;

#define JS_PROP_END { JS_DEF_END }
#define JS_CFUNC_DEF(name, length, func_name) { JS_DEF_CFUNC, name, { .func = { length, "0", "generic", #func_name } } }
#define JS_CFUNC_MAGIC_DEF(name, length, func_name, magic) { JS_DEF_CFUNC, name, { .func = { length, #magic, "generic_magic", #func_name } } }
#define JS_CFUNC_SPECIAL_DEF(name, length, proto, func_name) { JS_DEF_CFUNC, name, { .func = { length, "0", #proto, #func_name } } }
#define JS_CGETSET_DEF(name, get_name, set_name) { JS_DEF_CGETSET, name, { .getset = { "0", "generic", #get_name, #set_name } } }
#define JS_CGETSET_MAGIC_DEF(name, get_name, set_name, magic) { JS_DEF_CGETSET, name, { .getset = { #magic, "generic_magic", #get_name, #set_name } } }
#define JS_PROP_CLASS_DEF(name, cl) { JS_DEF_CLASS, name, { .class1 = cl } }
#define JS_PROP_DOUBLE_DEF(name, val, flags) { JS_DEF_PROP_DOUBLE, name, { .f64 = val } }
#define JS_PROP_UNDEFINED_DEF(name, flags) { JS_DEF_PROP_UNDEFINED, name }
#define JS_PROP_NULL_DEF(name, flags) { JS_DEF_PROP_NULL, name }
#define JS_PROP_STRING_DEF(name, cstr, flags) { JS_DEF_PROP_STRING, name, { .str = cstr } }

#define JS_CLASS_DEF(name, length, func_name, class_id, class_props, proto_props, parent_class, finalizer_name) { name, length, "constructor", #func_name, #class_id, class_props, proto_props, parent_class, #finalizer_name }
#define JS_CLASS_MAGIC_DEF(name, length, func_name, class_id, class_props, proto_props, parent_class, finalizer_name) { name, length, "constructor_magic", #func_name, #class_id, class_props, proto_props, parent_class, #finalizer_name }
#define JS_OBJECT_DEF(name, obj_props) { name, 0, NULL, NULL, NULL, obj_props, NULL, NULL, NULL }

int build_atoms(const char *stdlib_name, const JSPropDef *global_obj,
                const JSPropDef *c_function_decl, int argc, char **argv);

#endif /* MQUICKJS_BUILD_H */
