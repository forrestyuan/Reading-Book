/**
 * @param {string} s
 * @return {boolean}
 */
//解法一； 双指针
var isPalindrome = function (s) {
  let isValid = true;
  if (s.length < 2) return isValid;
  let i = 0, j = s.length - 1;
  while (i <= j) {
    if (!judgeValidChar(s[i])) { ++i; continue; }
    if (!judgeValidChar(s[j])) { --j; continue; }
    if (s[i].toLowerCase() !== s[j].toLowerCase()) {
      return false;
    }
    ++i;
    --j;
  }
  return isValid;
};

var judgeValidChar = function (chr) {
  chrCode = chr.toLowerCase().charCodeAt(0);
  let aCode = 'a'.charCodeAt(0);
  let zCode = 'z'.charCodeAt(0);
  let zeroCode = '0'.charCodeAt(0);
  let nineCode = '9'.charCodeAt(0);
  return chrCode >= aCode && chrCode <= zCode || chrCode >= zeroCode && chrCode <= nineCode
}

// 解法2： 栈


