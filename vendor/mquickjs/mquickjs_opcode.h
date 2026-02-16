/*
 * Micro QuickJS opcode definitions
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
#ifdef FMT
FMT(none)
FMT(none_int)
FMT(none_loc)
FMT(none_arg)
FMT(none_var_ref)
FMT(u8)
FMT(i8)
FMT(loc8)
FMT(const8)
FMT(label8)
FMT(u16)
FMT(i16)
FMT(label16)
FMT(npop)
FMT(npopx)
FMT(loc)
FMT(arg)
FMT(var_ref)
FMT(u32)
FMT(i32)
FMT(const16)
FMT(label)
FMT(value)
#undef FMT
#endif /* FMT */

#ifdef DEF

#ifndef def
#define def(id, size, n_pop, n_push, f) DEF(id, size, n_pop, n_push, f)
#endif

DEF(invalid, 1, 0, 0, none) /* never emitted */

/* push values */
DEF(     push_value, 5, 0, 1, value)
DEF(     push_const, 3, 0, 1, const16)
DEF(       fclosure, 3, 0, 1, const16)
DEF(      undefined, 1, 0, 1, none)
DEF(           null, 1, 0, 1, none)
DEF(      push_this, 1, 0, 1, none) /* only used at the start of a function */
DEF(     push_false, 1, 0, 1, none)
DEF(      push_true, 1, 0, 1, none)
DEF(         object, 3, 0, 1, u16)
DEF(      this_func, 1, 0, 1, none)
DEF(      arguments, 1, 0, 1, none)
DEF(     new_target, 1, 0, 1, none)

DEF(           drop, 1, 1, 0, none) /* a -> */
DEF(            nip, 1, 2, 1, none) /* a b -> b */
//DEF(           nip1, 1, 3, 2, none) /* a b c -> b c */
DEF(            dup, 1, 1, 2, none) /* a -> a a */
DEF(           dup1, 1, 2, 3, none) /* a b -> a a b */
DEF(           dup2, 1, 2, 4, none) /* a b -> a b a b */
//DEF(           dup3, 1, 3, 6, none) /* a b c -> a b c a b c */
DEF(        insert2, 1, 2, 3, none) /* obj a -> a obj a (dup_x1) */
DEF(        insert3, 1, 3, 4, none) /* obj prop a -> a obj prop a (dup_x2) */
//DEF(        insert4, 1, 4, 5, none) /* this obj prop a -> a this obj prop a */
DEF(          perm3, 1, 3, 3, none) /* obj a b -> a obj b */
DEF(          perm4, 1, 4, 4, none) /* obj prop a b -> a obj prop b */
//DEF(          perm5, 1, 5, 5, none) /* this obj prop a b -> a this obj prop b */
DEF(           swap, 1, 2, 2, none) /* a b -> b a */
//DEF(          swap2, 1, 4, 4, none) /* a b c d -> c d a b */
DEF(          rot3l, 1, 3, 3, none) /* x a b -> a b x */
//DEF(          rot3r, 1, 3, 3, none) /* a b x -> x a b */
//DEF(          rot4l, 1, 4, 4, none) /* x a b c -> a b c x */
//DEF(          rot5l, 1, 5, 5, none) /* x a b c d -> a b c d x */

DEF(call_constructor, 3, 1, 1, npop) /* func args... -> ret (arguments are not counted in n_pop) */
DEF(           call, 3, 1, 1, npop) /* func args... -> ret (arguments are not counted in n_pop) */
DEF(    call_method, 3, 2, 1, npop) /* this func args.. -> ret (arguments are not counted in n_pop) */
DEF(     array_from, 3, 0, 1, npop) /* arguments are not counted in n_pop */
DEF(         return, 1, 1, 0, none)
DEF(   return_undef, 1, 0, 0, none)
DEF(          throw, 1, 1, 0, none)
DEF(         regexp, 1, 2, 1, none) /* create a RegExp object from the pattern and a bytecode string */

DEF(      get_field, 3, 1, 1, const16) /* obj -> val */
DEF(     get_field2, 3, 1, 2, const16) /* obj -> obj val */
DEF(      put_field, 3, 2, 0, const16) /* obj val -> */
DEF(   get_array_el, 1, 2, 1, none) /* obj prop -> val */
DEF(  get_array_el2, 1, 2, 2, none) /* obj prop -> obj value */
DEF(   put_array_el, 1, 3, 0, none) /* obj prop val -> */
DEF(     get_length, 1, 1, 1, none) /* obj -> val */
DEF(    get_length2, 1, 1, 2, none) /* obj -> obj val */
DEF(   define_field, 3, 2, 1, const16) /* obj val -> obj */
DEF(   define_getter, 3, 2, 1, const16) /* obj val -> obj */
DEF(   define_setter, 3, 2, 1, const16) /* obj val -> obj */
DEF(      set_proto, 1, 2, 1, none) /* obj proto -> obj */

DEF(        get_loc, 3, 0, 1, loc)
DEF(        put_loc, 3, 1, 0, loc) /* must come after get_loc */
DEF(        get_arg, 3, 0, 1, arg)
DEF(        put_arg, 3, 1, 0, arg) /* must come after get_arg */
DEF(    get_var_ref, 3, 0, 1, var_ref) 
DEF(    put_var_ref, 3, 1, 0, var_ref) /* must come after get_var_ref */
DEF(get_var_ref_nocheck, 3, 0, 1, var_ref) 
DEF(put_var_ref_nocheck, 3, 1, 0, var_ref)
DEF(       if_false, 5, 1, 0, label)
DEF(        if_true, 5, 1, 0, label) /* must come after if_false */
DEF(           goto, 5, 0, 0, label) /* must come after if_true */
DEF(          catch, 5, 0, 1, label)
DEF(          gosub, 5, 0, 0, label) /* used to execute the finally block */
DEF(            ret, 1, 1, 0, none) /* used to return from the finally block */

DEF(   for_in_start, 1, 1, 1, none) /* obj -> iter */
DEF(   for_of_start, 1, 1, 1, none) /* obj -> iter */
DEF(    for_of_next, 1, 1, 3, none) /* iter -> iter val done */

/* arithmetic/logic operations */
DEF(            neg, 1, 1, 1, none)
DEF(           plus, 1, 1, 1, none)
DEF(            dec, 1, 1, 1, none)
DEF(            inc, 1, 1, 1, none)
DEF(       post_dec, 1, 1, 2, none)
DEF(       post_inc, 1, 1, 2, none)
DEF(            not, 1, 1, 1, none)
DEF(           lnot, 1, 1, 1, none)
DEF(         typeof, 1, 1, 1, none)
DEF(         delete, 1, 2, 1, none) /* obj prop -> ret */

DEF(            mul, 1, 2, 1, none)
DEF(            div, 1, 2, 1, none)
DEF(            mod, 1, 2, 1, none)
DEF(            add, 1, 2, 1, none)
DEF(            sub, 1, 2, 1, none)
DEF(            pow, 1, 2, 1, none)
DEF(            shl, 1, 2, 1, none)
DEF(            sar, 1, 2, 1, none)
DEF(            shr, 1, 2, 1, none)
DEF(             lt, 1, 2, 1, none)
DEF(            lte, 1, 2, 1, none)
DEF(             gt, 1, 2, 1, none)
DEF(            gte, 1, 2, 1, none)
DEF(     instanceof, 1, 2, 1, none)
DEF(             in, 1, 2, 1, none)
DEF(             eq, 1, 2, 1, none)
DEF(            neq, 1, 2, 1, none)
DEF(      strict_eq, 1, 2, 1, none)
DEF(     strict_neq, 1, 2, 1, none)
DEF(            and, 1, 2, 1, none)
DEF(            xor, 1, 2, 1, none)
DEF(             or, 1, 2, 1, none)
/* must be the last non short and non temporary opcode */
DEF(            nop, 1, 0, 0, none) 

DEF(    push_minus1, 1, 0, 1, none_int)
DEF(         push_0, 1, 0, 1, none_int)
DEF(         push_1, 1, 0, 1, none_int)
DEF(         push_2, 1, 0, 1, none_int)
DEF(         push_3, 1, 0, 1, none_int)
DEF(         push_4, 1, 0, 1, none_int)
DEF(         push_5, 1, 0, 1, none_int)
DEF(         push_6, 1, 0, 1, none_int)
DEF(         push_7, 1, 0, 1, none_int)
DEF(        push_i8, 2, 0, 1, i8)
DEF(       push_i16, 3, 0, 1, i16)
DEF(    push_const8, 2, 0, 1, const8)
DEF(      fclosure8, 2, 0, 1, const8) /* must follow push_const8 */
DEF(push_empty_string, 1, 0, 1, none)

DEF(       get_loc8, 2, 0, 1, loc8)
DEF(       put_loc8, 2, 1, 0, loc8) /* must follow get_loc8 */

DEF(       get_loc0, 1, 0, 1, none_loc)
DEF(       get_loc1, 1, 0, 1, none_loc)
DEF(       get_loc2, 1, 0, 1, none_loc)
DEF(       get_loc3, 1, 0, 1, none_loc)
DEF(       put_loc0, 1, 1, 0, none_loc)  /* must follow get_loc */
DEF(       put_loc1, 1, 1, 0, none_loc)
DEF(       put_loc2, 1, 1, 0, none_loc)
DEF(       put_loc3, 1, 1, 0, none_loc)
DEF(       get_arg0, 1, 0, 1, none_arg)
DEF(       get_arg1, 1, 0, 1, none_arg)
DEF(       get_arg2, 1, 0, 1, none_arg)
DEF(       get_arg3, 1, 0, 1, none_arg)
DEF(       put_arg0, 1, 1, 0, none_arg)  /* must follow get_arg */
DEF(       put_arg1, 1, 1, 0, none_arg)
DEF(       put_arg2, 1, 1, 0, none_arg)
DEF(       put_arg3, 1, 1, 0, none_arg)
#if 0
DEF(      if_false8, 2, 1, 0, label8)
DEF(       if_true8, 2, 1, 0, label8) /* must come after if_false8 */
DEF(          goto8, 2, 0, 0, label8) /* must come after if_true8 */
DEF(         goto16, 3, 0, 0, label16)

DEF(          call0, 1, 1, 1, npopx)
DEF(          call1, 1, 1, 1, npopx)
DEF(          call2, 1, 1, 1, npopx)
DEF(          call3, 1, 1, 1, npopx)
#endif

#undef DEF
#undef def
#endif  /* DEF */

#ifdef REDEF

/* regular expression bytecode */
REDEF(invalid, 1) /* never used */
REDEF(char1, 2)
REDEF(char2, 3)
REDEF(char3, 4)
REDEF(char4, 5)
REDEF(dot, 1)
REDEF(any, 1) /* same as dot but match any character including line terminator */
REDEF(space, 1)
REDEF(not_space, 1) /* must come after */
REDEF(line_start, 1)
REDEF(line_start_m, 1)
REDEF(line_end, 1)
REDEF(line_end_m, 1)
REDEF(goto, 5)
REDEF(split_goto_first, 5)
REDEF(split_next_first, 5)
REDEF(match, 1)
REDEF(lookahead_match, 1)
REDEF(negative_lookahead_match, 1) /* must come after */
REDEF(save_start, 2) /* save start position */
REDEF(save_end, 2) /* save end position, must come after saved_start */
REDEF(save_reset, 3) /* reset save positions */
REDEF(loop, 6) /* decrement the top the stack and goto if != 0 */
REDEF(loop_split_goto_first, 10) /* loop and then split */
REDEF(loop_split_next_first, 10)
REDEF(loop_check_adv_split_goto_first, 10) /* loop and then check advance and split */
REDEF(loop_check_adv_split_next_first, 10)
REDEF(set_i32, 6) /* store the immediate value to a register */
REDEF(word_boundary, 1)
REDEF(not_word_boundary, 1)
REDEF(back_reference, 2)
REDEF(back_reference_i, 2)
REDEF(range8, 2) /* variable length */
REDEF(range, 3) /* variable length */
REDEF(lookahead, 5)
REDEF(negative_lookahead, 5) /* must come after */
REDEF(set_char_pos, 2) /* store the character position to a register */
REDEF(check_advance, 2) /* check that the register is different from the character position */

#endif /* REDEF */
