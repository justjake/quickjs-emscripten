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
#include <stdlib.h>
#include <stdio.h>
#include <stdarg.h>
#include <string.h>

#include "cutils.h"

void pstrcpy(char *buf, int buf_size, const char *str)
{
    int c;
    char *q = buf;

    if (buf_size <= 0)
        return;

    for(;;) {
        c = *str++;
        if (c == 0 || q >= buf + buf_size - 1)
            break;
        *q++ = c;
    }
    *q = '\0';
}

/* strcat and truncate. */
char *pstrcat(char *buf, int buf_size, const char *s)
{
    int len;
    len = strlen(buf);
    if (len < buf_size)
        pstrcpy(buf + len, buf_size - len, s);
    return buf;
}

int strstart(const char *str, const char *val, const char **ptr)
{
    const char *p, *q;
    p = str;
    q = val;
    while (*q != '\0') {
        if (*p != *q)
            return 0;
        p++;
        q++;
    }
    if (ptr)
        *ptr = p;
    return 1;
}

int has_suffix(const char *str, const char *suffix)
{
    size_t len = strlen(str);
    size_t slen = strlen(suffix);
    return (len >= slen && !memcmp(str + len - slen, suffix, slen));
}

size_t __unicode_to_utf8(uint8_t *buf, unsigned int c)
{
    uint8_t *q = buf;

    if (c < 0x800) {
        *q++ = (c >> 6) | 0xc0;
    } else {
        if (c < 0x10000) {
            *q++ = (c >> 12) | 0xe0;
        } else {
            if (c < 0x00200000) {
                *q++ = (c >> 18) | 0xf0;
            } else {
                return 0;
            }
            *q++ = ((c >> 12) & 0x3f) | 0x80;
        }
        *q++ = ((c >> 6) & 0x3f) | 0x80;
    }
    *q++ = (c & 0x3f) | 0x80;
    return q - buf;
}

int __unicode_from_utf8(const uint8_t *p, size_t max_len, size_t *plen)
{
    size_t len = 1;
    int c;
    
    c = p[0];
    if (c < 0xc0) {
        goto fail;
    } else if (c < 0xe0) {
        if (unlikely(max_len < 2 || (p[1] & 0xc0) != 0x80))
            goto fail;
        c = ((p[0] & 0x1f) << 6) | (p[1] & 0x3f);
        len = 2;
        if (unlikely(c < 0x80))
            goto fail;
    } else if (c < 0xf0) {
        if (unlikely(max_len < 2 || (p[1] & 0xc0) != 0x80))
            goto fail;
        if (unlikely(max_len < 3 || (p[2] & 0xc0) != 0x80)) {
            len = 2;
            goto fail;
        }
        c = ((p[0] & 0x0f) << 12) | ((p[1] & 0x3f) << 6) | (p[2] & 0x3f);
        len = 3;
        if (unlikely(c < 0x800))
            goto fail;
    } else if (c < 0xf8) {
        if (unlikely(max_len < 2 || (p[1] & 0xc0) != 0x80))
            goto fail;
        if (unlikely(max_len < 3 || (p[2] & 0xc0) != 0x80)) {
            len = 2;
            goto fail;
        }
        if (unlikely(max_len < 4 || (p[3] & 0xc0) != 0x80)) {
            len = 3;
            goto fail;
        }
        c = ((p[0] & 0x07) << 18) | ((p[1] & 0x3f) << 12) | ((p[2] & 0x3f) << 6) | (p[3] & 0x3f);
        len = 4;
        /* We explicitly accept surrogate pairs */
        if (unlikely(c < 0x10000 || c > 0x10ffff))
            goto fail;
    } else {
    fail:
        *plen = len;
        return -1;
    }
    *plen = len;
    return c;
}

int __utf8_get(const uint8_t *p, size_t *plen)
{
    size_t len;
    int c;
    
    c = p[0];
    if (c < 0xc0) {
        len = 1;
    } else if (c < 0xe0) {
        c = ((p[0] & 0x1f) << 6) | (p[1] & 0x3f);
        len = 2;
    } else if (c < 0xf0) {
        c = ((p[0] & 0x0f) << 12) | ((p[1] & 0x3f) << 6) | (p[2] & 0x3f);
        len = 3;
    } else if (c < 0xf8) {
        c = ((p[0] & 0x07) << 18) | ((p[1] & 0x3f) << 12) | ((p[2] & 0x3f) << 6) | (p[3] & 0x3f);
        len = 4;
    } else {
        len = 1;
    }
    *plen = len;
    return c;
}
