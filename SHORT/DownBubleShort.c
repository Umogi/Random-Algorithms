#include <stdio.h>

#define L 10

int Array[L] = {5, 3, 8, 4, 2, 9, 7, 1, 6, 0};  

void Switcher(int *x, int *y) {    
    int z = *x;  
    *x = *y;  
    *y = z;  
}    

int main() {   
    int max = -1, maxP = 0;
    int min = Array[0], minP = 0;

    for(int i = 0; i < L; i++) {  
        if(max < Array[i]) {  
            max = Array[i];  
            maxP = i;  
        }  
        if(min > Array[i]) {  
            min = Array[i];  
            minP = i;  
        }  
    }  

    Switcher(&Array[0], &Array[minP]);  
    Switcher(&Array[L-1], &Array[maxP]);  

    for(int i = 1; i < L - 1; i++) {  
        min = Array[i];  
        minP = i;  
        for(int y = i + 1; y < L - 1; y++) {  
            if(min > Array[y]) {  
                min = Array[y];  
                minP = y;  
            }  
        }  
        Switcher(&Array[i], &Array[minP]);  
    }  

    for(int i = 0; i < L; i++) {
        printf("%d ", Array[i]);
    }

    return 0;
}
