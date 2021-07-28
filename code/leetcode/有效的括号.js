/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var stack = [],
      brack = {"{":"}","[":"]","(":")"};
  for(var i = 0; i < s.length; i++){
      var chr = s.charAt(i);
      (brack[stack[stack.length - 1]] != chr) ? stack.push(chr) : stack.pop();
  }
  return !stack.length;
};
/*
执行用时：68 ms, 在所有 JavaScript 提交中击败了75.30%的用户
内存消耗：32.6 MB, 在所有 JavaScript 提交中击败了100.00%的用户
*/