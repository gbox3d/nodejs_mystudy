#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc,char *argv[]) {

    char str[] = "My name is Oh Su Cheol";
    char *pToken = NULL;
    char *pSeparator = " "; //구분자
    /* 첫번째 수행시에" " 구분자로 자른 후 My 라는 문자열을 리턴합니다. 정확히 얘기하면 주소값을 리턴합니다.
    나머지 name is.... 문자열은 strtok() 함수 내부에서 static 변수로 기억되고 있다가,
    두번째 호출시 파라미터에 NULL을 받게되면 기억하고 있던 name is... 문자열을 꺼내어 다시 자르게 됩니다. */

    pToken = strtok(str, pSeparator);
    printf("%s\n", pToken);

    /* 두번째 수행부터 strtok() 호출시에는 파라미터에 NULL을 넣음으로 계속해서 자르기 작업을 수행하게 됩니다.
    strtok가 NULL을 반환하면 더 이상 자를 문자열이 없으므로 while 문을 빠져 나갑니다. */

    while (NULL != (pToken = strtok(NULL, pSeparator)))
    {
    printf("%s\n", pToken);
    }


//스트링비교
    {
        char *strTemp = "hello";
        printf("strcmp : hello %d\n",strcmp(strTemp,"hello"));
        printf("strcmp : Hello %d\n",strcmp(strTemp,"Hello"));

    }

//문자 붙이기
    {
        char strTemp1[50] = "hello";
        char *strTemp2 = "world";

        strcat(strTemp1,strTemp2);
        puts(strTemp1);
    }

//문자열찾기
    {
        char *string1 = "CDSDC::walrus BDSDC::walrus";
        char *string3 = strstr(string1,"walrus");

        puts(string3);
//위치얻기
        printf("find pos :%lu \n",strlen(string1) - strlen(string3));

    }

    //문자열끊어내기
    {

        printf("strspn %lu , strcspn : %lu \n",
            strspn ("hello, world", "abcdefghijklmnopqrstuvwxyz"),
            strcspn ("hello, world", " \t\n,.;!?"));

        printf("strpbrk : %s \n",
            strpbrk ("hello, world", " \t\n,.;!?")
            );

    }

    //문자 <-> 숫자 변환 stdlib.h 필요함
    {

        printf("atoi test : %d \n", 10 + atoi("7"));

        char strTemp1[50] = "index : ";
        char strTemp2[50];

        //itoa 는 비표준임
        sprintf(strTemp2,"%d",737768);
        strcat(strTemp1 , strTemp2);
        puts(strTemp1);

    }


    return 0;
}