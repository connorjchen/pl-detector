//
// Created by luozhen on 2017/8/25.
//

#ifndef CODEFORCES_BLOCK_ALI_H
#define CODEFORCES_BLOCK_ALI_H

#endif //CODEFORCES_BLOCK_ALI_H
#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int Get(int n){
    int x;
    // do something
    int sq = sqrt(n * 2.0) - 1;
//    if(n == sq)
//        return n;
    while(sq * (sq + 1) / 2 < n){
        sq += 1;
    }
    printf("sq:%d", sq);
    x = n - sq * (sq - 1) / 2;
    return x % 10;
}

int block_main()
{
    int n;
    scanf("%d",&n);
    n += 1;
    int x;
    // do something
    int sq = sqrt(n * 2.0) - 1;
    while(sq * (sq + 1) / 2 < n){
        sq += 1;
    }
    x = n - sq * (sq - 1) / 2;
    printf("%d",x%10);
}