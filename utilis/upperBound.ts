export function upperBound<T>(arr: T[], target: T, compareFn: (a: T, b: T) => number): number {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (compareFn(arr[mid], target) <= 0) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}