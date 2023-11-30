#
# QuickJS Javascript Engine
# 
# Copyright (c) 2017-2021 Fabrice Bellard
# Copyright (c) 2017-2021 Charlie Gordon
# Copyright (c) 2023 Ben Noordhuis
# Copyright (c) 2023 Saúl Ibarra Corretgé
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

BUILD_DIR=build
BUILD_TYPE?=Release
JOBS?=$(shell getconf _NPROCESSORS_ONLN)

QJS=$(BUILD_DIR)/qjs
RUN262=$(BUILD_DIR)/run-test262


all: build

build: $(BUILD_DIR)/CMakeCache.txt
	cmake --build $(BUILD_DIR) -j $(JOBS)

$(BUILD_DIR)/CMakeCache.txt:
	cmake -B $(BUILD_DIR) -DCMAKE_BUILD_TYPE=$(BUILD_TYPE)

install: build
	cmake --build $(BUILD_DIR) --target install

clean:
	cmake --build $(BUILD_DIR) --target clean

debug:
	BUILD_TYPE=Debug $(MAKE)

distclean:
	@rm -rf $(BUILD_DIR)

stats: build
	$(QJS) -qd

test: build
	$(QJS) tests/test_bigint.js
	$(QJS) tests/test_closure.js
	$(QJS) tests/test_language.js
	$(QJS) tests/test_builtin.js
	$(QJS) tests/test_loop.js
	$(QJS) tests/test_std.js
	$(QJS) tests/test_worker.js
	$(QJS) tests/test_queue_microtask.js

test262: build
	$(RUN262) -m -c test262.conf -a

test262-update: build
	$(RUN262) -u -c test262.conf -a

test262-check: build
	$(RUN262) -m -c test262.conf -E -a

microbench: build
	$(QJS) tests/microbench.js

unicode_gen: $(BUILD_DIR)/CMakeCache.txt
	cmake --build $(BUILD_DIR) --target unicode_gen

libunicode-table.h: unicode_gen
	$(BUILD_DIR)/unicode_gen unicode $@

.PHONY: all build debug install clean distclean stats test test262 test262-update test262-check microbench unicode_gen
