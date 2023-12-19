function findCeil<T>(arr: T[], r: number, l: number, h: number) {
  while (l < h) {
    let mid = l + ((h - l) >> 1); // Same as mid = (l+h)/2
    r > arr[mid] ? (l = mid + 1) : (h = mid);
  }
  return arr[l] >= r ? l : -1;
}

export function randomNumberGenerate<T>(arr: T[], freq: number[], n: number) {
  let prefix: number[] = [];

  prefix[0] = freq[0];
  for (let i = 1; i < n; ++i) prefix[i] = prefix[i - 1] + freq[i];
  let r = Math.floor(Math.random() * prefix[n - 1]) + 1;

  let indexc = findCeil<(typeof prefix)[0]>(prefix, r, 0, n - 1);
  return indexc;
}

export function capitalizeFirstLetters(arrOfWords: string[]) {
  return arrOfWords.map((item) => {
    return item
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  });
}
