/**
 * @param {number} n
 * @return {string}
 */
 var countAndSay = function (n) {
  if (n === 1) return '1';
  let str = countAndSay(n - 1);
  let val = '';
  let count = 0;
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (val !== str[i]) {
      count = 1;
      val = str[i];
    } else {
      ++count;
    }
    if (val !== str[i + 1]) {
      res += count + val;
    }
  }
  return res;
};

console.log(countAndSay(5));
