
#include <stdio.h>

int main(int argc,char *argv[]) {

    float f_val;
    char string_val[16];
    int int_val;
    char c_val;

    puts("formarted io---------- %d,%f,%s,%c ");
    scanf("%d,%f,%s,%c",&int_val,&f_val,string_val,&c_val);
    printf("%d,%f,%s,%c \n",int_val,f_val,string_val,c_val);

    {
    /*
    한꺼번에 공백으로 구분해서 입력가능하다.
    */
        int a[3];
        scanf("%d",&a[0]);
        scanf("%d",&a[1]);
        scanf("%d",&a[2]);

        for(int i=0;i<3;i++)
        {
            fputc(a[i],stdout);
        }


    }


    return 0;
}


