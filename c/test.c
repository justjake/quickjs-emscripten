#include <stdio.h>
#include "interface.c"

void eval_and_log(char* code) {
  char* result = eval(code);
  fputs("-->\n", stdout);
  fputs(result, stdout);
  fputs("<--\n", stdout);
}

int main() {
  eval_and_log(
      "\"hello \" + \"world!\""
  );
  eval_and_log(
      "\"hello \" + \"worl"
  );

  return 0;
}
