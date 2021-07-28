/**
 * @param {number} x
 * @return {boolean}
 */
//方法一：

var isPalindrome = function (x) {
  if (x < 0) return false;
  x = new String(x);
  for (var i = 0, j = x.length - 1; i < j; i++ , j--)
    if (x.charAt(i) != x.charAt(j)) return false;
  return true;
};

// 方法二：
var isPalindrome2 = function (x) {
  if (x < 0) return false;
  var y = +(("" + x).split("").reverse().join(""));
  return x == y ? true : false;
};

//方法三：

var isPalindrome3 = function (x: number): boolean {
  if (x < 0 || (x % 10 == 0 && x != 0)) return false;
  let rnum: number = 0;
  while (x > rnum) {
    rnum = rnum * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return (x == rnum || x == Math.floor(rnum / 10)) ? true : false;
}