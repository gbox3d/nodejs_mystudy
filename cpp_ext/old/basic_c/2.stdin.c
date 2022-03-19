#include <stdio.h>

int main(int argc,char *argv[]) {

    char cmd[32];

    fgets(cmd,32,stdin);

    puts(cmd);

    char code;

    code = fgetc(stdin);
    putc(code,stdout);

    return 0;
}