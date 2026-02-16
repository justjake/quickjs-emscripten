/*
 * C utilities
 * 
 * Copyright (c) 2017 Fabrice Bellard
 * Copyright (c) 2018 Charlie Gordon
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
#ifndef CUTILS_H
#define CUTILS_H

#include <stdlib.h>
#include <inttypes.h>

/* set if CPU is big endian */
#undef WORDS_BIGENDIAN

#define likely(x)       __builtin_expect(!!(x), 1)
#define unlikely(x)     __builtin_expect(!!(x), 0)
#define force_inline inline __attribute__((always_inline))
#define no_inline __attribute__((noinline))
#define __maybe_unused __attribute__((unused))

#define xglue(x, y) x ## y
#define glue(x, y) xglue(x, y)
#define stringify(s)    tostring(s)
#define tostring(s)     #s

#ifndef offsetof
#define offsetof(type, field) ((size_t) &((type *)0)->field)
#endif
#ifndef countof
#define countof(x) (sizeof(x) / sizeof((x)[0]))
#endif

/* return the pointer of type 'type *' containing 'ptr' as field 'member' */
#define container_of(ptr, type, member) ((type *)((uint8_t *)(ptr) - offsetof(type, member)))

typedef int BOOL;

#ifndef FALSE
enum {
    FALSE = 0,
    TRUE = 1,
};
#endif

void pstrcpy(char *buf, int buf_size, const char *str);
char *pstrcat(char *buf, int buf_size, const char *s);
int strstart(const char *str, const char *val, const char **ptr);
int has_suffix(const char *str, const char *suffix);

static inline int max_int(int a, int b)
{
    if (a > b)
        return a;
    else
        return b;
}

static inline int min_int(int a, int b)
{
    if (a < b)
        return a;
    else
        return b;
}

static inline uint32_t max_uint32(uint32_t a, uint32_t b)
{
    if (a > b)
        return a;
    else
        return b;
}

static inline uint32_t min_uint32(uint32_t a, uint32_t b)
{
    if (a < b)
        return a;
    else
        return b;
}

static inline int64_t max_int64(int64_t a, int64_t b)
{
    if (a > b)
        return a;
    else
        return b;
}

static inline int64_t min_int64(int64_t a, int64_t b)
{
    if (a < b)
        return a;
    else
        return b;
}

static inline size_t max_size_t(size_t a, size_t b)
{
    if (a > b)
        return a;
    else
        return b;
}

static inline size_t min_size_t(size_t a, size_t b)
{
    if (a < b)
        return a;
    else
        return b;
}

/* WARNING: undefined if a = 0 */
static inline int clz32(unsigned int a)
{
    return __builtin_clz(a);
}

/* WARNING: undefined if a = 0 */
static inline int clz64(uint64_t a)
{
    return __builtin_clzll(a);
}

/* WARNING: undefined if a = 0 */
static inline int ctz32(unsigned int a)
{
    return __builtin_ctz(a);
}

/* WARNING: undefined if a = 0 */
static inline int ctz64(uint64_t a)
{
    return __builtin_ctzll(a);
}

struct __attribute__((packed)) packed_u64 {
    uint64_t v;
};

struct __attribute__((packed)) packed_u32 {
    uint32_t v;
};

struct __attribute__((packed)) packed_u16 {
    uint16_t v;
};

static inline uint64_t get_u64(const uint8_t *tab)
{
    return ((const struct packed_u64 *)tab)->v;
}

static inline int64_t get_i64(const uint8_t *tab)
{
    return (int64_t)((const struct packed_u64 *)tab)->v;
}

static inline void put_u64(uint8_t *tab, uint64_t val)
{
    ((struct packed_u64 *)tab)->v = val;
}

static inline uint32_t get_u32(const uint8_t *tab)
{
    return ((const struct packed_u32 *)tab)->v;
}

static inline int32_t get_i32(const uint8_t *tab)
{
    return (int32_t)((const struct packed_u32 *)tab)->v;
}

static inline void put_u32(uint8_t *tab, uint32_t val)
{
    ((struct packed_u32 *)tab)->v = val;
}

static inline uint32_t get_u16(const uint8_t *tab)
{
    return ((const struct packed_u16 *)tab)->v;
}

static inline int32_t get_i16(const uint8_t *tab)
{
    return (int16_t)((const struct packed_u16 *)tab)->v;
}

static inline void put_u16(uint8_t *tab, uint16_t val)
{
    ((struct packed_u16 *)tab)->v = val;
}

static inline uint32_t get_u8(const uint8_t *tab)
{
    return *tab;
}

static inline int32_t get_i8(const uint8_t *tab)
{
    return (int8_t)*tab;
}

static inline void put_u8(uint8_t *tab, uint8_t val)
{
    *tab = val;
}

static inline uint16_t bswap16(uint16_t x)
{
    return (x >> 8) | (x << 8);
}

static inline uint32_t bswap32(uint32_t v)
{
    return ((v & 0xff000000) >> 24) | ((v & 0x00ff0000) >>  8) |
        ((v & 0x0000ff00) <<  8) | ((v & 0x000000ff) << 24);
}

static inline uint64_t bswap64(uint64_t v)
{
    return ((v & ((uint64_t)0xff << (7 * 8))) >> (7 * 8)) | 
        ((v & ((uint64_t)0xff << (6 * 8))) >> (5 * 8)) | 
        ((v & ((uint64_t)0xff << (5 * 8))) >> (3 * 8)) | 
        ((v & ((uint64_t)0xff << (4 * 8))) >> (1 * 8)) | 
        ((v & ((uint64_t)0xff << (3 * 8))) << (1 * 8)) | 
        ((v & ((uint64_t)0xff << (2 * 8))) << (3 * 8)) | 
        ((v & ((uint64_t)0xff << (1 * 8))) << (5 * 8)) | 
        ((v & ((uint64_t)0xff << (0 * 8))) << (7 * 8));
}

static inline uint32_t get_be32(const uint8_t *d)
{
    return bswap32(get_u32(d));
}

static inline void put_be32(uint8_t *d, uint32_t v)
{
    put_u32(d, bswap32(v));
}

#define UTF8_CHAR_LEN_MAX 4

size_t __unicode_to_utf8(uint8_t *buf, unsigned int c);
int __unicode_from_utf8(const uint8_t *p, size_t max_len, size_t *plen);
int __utf8_get(const uint8_t *p, size_t *plen);

/* Note: at most 21 bits are encoded. At most UTF8_CHAR_LEN_MAX bytes
   are output. */
static inline size_t unicode_to_utf8(uint8_t *buf, unsigned int c)
{
    if (c < 0x80) {
        buf[0] = c;
        return 1;
    } else {
        return __unicode_to_utf8(buf, c);
    }
}

/* return -1 in case of error. Surrogates are accepted. max_len must
   be >= 1. *plen is set in case of error and always >= 1. */
static inline int unicode_from_utf8(const uint8_t *buf, size_t max_len, size_t *plen)
{
    if (buf[0] < 0x80) {
        *plen = 1;
        return buf[0];
    } else {
        return __unicode_from_utf8(buf, max_len, plen);
    }
}

/* Warning: no error checking is done so the UTF-8 encoding must be
   validated before. */
static force_inline int utf8_get(const uint8_t *buf, size_t *plen)
{
    if (likely(buf[0] < 0x80)) {
        *plen = 1;
        return buf[0];
    } else {
        return __utf8_get(buf, plen);
    }
}

static inline int from_hex(int c)
{
    if (c >= '0' && c <= '9')
        return c - '0';
    else if (c >= 'A' && c <= 'F')
        return c - 'A' + 10;
    else if (c >= 'a' && c <= 'f')
        return c - 'a' + 10;
    else
        return -1;
}

static inline uint64_t float64_as_uint64(double d)
{
    union {
        double d;
        uint64_t u64;
    } u;
    u.d = d;
    return u.u64;
}

static inline double uint64_as_float64(uint64_t u64)
{
    union {
        double d;
        uint64_t u64;
    } u;
    u.u64 = u64;
    return u.d;
}

typedef union {
    uint32_t u32;
    float f;
} f32_union;

static inline uint32_t float_as_uint(float f)
{
    f32_union u;
    u.f = f;
    return u.u32;
}

static inline float uint_as_float(uint32_t v)
{
    f32_union u;
    u.u32 = v;
    return u.f;
}

#endif  /* CUTILS_H */
