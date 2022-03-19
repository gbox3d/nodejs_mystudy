#include <stdio.h>

int main(int argc,char *argv[])
{
    printf("%d \n",argc);

    {
        int i;
        for(i=0;i<argc;i++) {
            puts(argv[i]);
        }
    }


    putc('A',stdout);
    fputc('B',stdout);
    putchar('C');putchar('\n');

    //마지막에 \n을 출력한다.
    puts("test1");

    printf("test2\n");


}