#include <stdio.h>

#define L 10

int Array[L] = {5, 3, 8, 4, 2, 9, 7, 1, 6, 0};

void Switcher(int *x, int *y) {    
    int temp = *x;  
    *x = *y;  
    *y = temp;  
}    

int main() {   
    for (int i = 0; i < L / 2; i++) {
        int minP = i, maxP = i;

        for (int j = i; j < L - i; j++) {  
            if (Array[j] < Array[minP]) minP = j;  
            if (Array[j] > Array[maxP]) maxP = j;  
        }  

        Switcher(&Array[i], &Array[minP]);  

        if (maxP == i) maxP = minP;

        Switcher(&Array[L - i - 1], &Array[maxP]);  
    }  

    for (int i = 0; i < L; i++) {
        printf("%d ", Array[i]);
    }

    return 0;
}
