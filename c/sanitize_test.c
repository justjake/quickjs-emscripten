#include <emscripten.h>
#include <sanitizer/lsan_interface.h>
#include <stdlib.h>

int main() {
  malloc(5000);
  __lsan_do_recoverable_leak_check();
}