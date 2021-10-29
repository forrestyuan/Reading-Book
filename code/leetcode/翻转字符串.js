/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  for (let i = 0, j = s.length - 1; i < j; ++i, --j) {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  }
  return s;
};

console.log(reverseString(["H", "a", "n", "n", "a", "h"]))
console.log(reverseString(["h", "e", "l", "l", "o"]))