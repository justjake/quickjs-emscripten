#include <stdio.h>
#include "interface.c"

int main() {
  char* result = eval(
      "\"hello \" + \"world!\""
  );
  fputs("---\n", stdout);
  fputs(result, stdout);
  fputs("\n", stdout);
  /*free(result);*/

  return 0;
}
