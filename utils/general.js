// A utility function to swap two elements
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/* This function takes last element as pivot, places
 the pivot element at its correct position in sorted
 array, and places all smaller (smaller than pivot)
 to left of pivot and all greater elements to right
 of pivot */
 function partition(arr, low, high) {
  // pivot
  let pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller 
    // than the pivot
    if (new Date(arr[j].date) < new Date(pivot.date)) {
      // Increment index of 
      // smaller element
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return (i + 1);
};

/* The main function that implements QuickSort
  arr[] --> Array to be sorted,
  low --> Starting index,
  high --> Ending index
*/
function quickSort(arr, low, high) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place 
    let pi = partition(arr, low, high);
  
    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  };
  return arr;
};

module.exports = {
  insertionSortByDate: (arr, n) => {  
    let i, key, j;  
    for (i = 1; i < n; i++) {  
      key = arr[i];  
      j = i - 1;  
      while (j >= 0 && new Date(arr[j].date) > new Date(key.date)) {  
        arr[j + 1] = arr[j];  
        j = j - 1;  
      }  
      arr[j + 1] = key;  
    };
    return arr;
  },
  quickSortByDate: quickSort,
};