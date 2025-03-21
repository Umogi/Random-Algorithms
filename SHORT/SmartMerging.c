#include <stdio.h>

void Switcher(int *x, int *y) {    
    int temp = *x;  
    *x = *y;  
    *y = temp;  
}

void bubbleSort(int arr[], int start, int end) {
    int swapped;
    do {
        swapped = 0;
        for (int i = start; i < end - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                Switcher(&arr[i], &arr[i + 1]);
                swapped = 1;
            }
        }
    } while (swapped);
}

void SmartMerging(int arr[], int n) {
    for (int size = 2; size < n; size *= 2) {  // 2, 4, 8...
        for (int i = 0; i < n; i += size) {
            int end = (i + size < n) ? (i + size) : n;
            bubbleSort(arr, i, end);
        }
    }
    bubbleSort(arr, 0, n);
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    SmartMerging(arr, n);
    printf("Sorted array:\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
