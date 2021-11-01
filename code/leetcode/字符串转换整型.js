/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let intVal = 0;
  let intStr = '';
  // 去除两端的空格
  s = s.trim();
  //判断是否有+-，且正负符号后面是数字，如果没有正负，则开头必须是数字才进行循环处理
  if (!/^[+-]?[0-9]+.*$/.test(s)) return intVal;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ' || s[i] === '+') {
      // 已经读到数字了，右读到+或空格，break掉。
      if (intStr.length > 0) break;
      // 如果是开头的空格或者正号，则继续读取
      continue;
    }
    if (s[i] === '-') {
       // 已经读到数字了，右读到-，break掉。
      if (intStr.length > 0) break;
      intStr += s[i];
      continue;
    }
    //剩余其它非数字
    if (/[^0-9]/.test(s[i])) {
      if (intStr.length > 0) break;
    }
    //读到数字
    if (/[0-9]/.test(s[i])) {
      intStr += s[i];
    }
  }
  intVal = Number(intStr);
  return intVal < Math.pow(-2, 31)
    ? Math.pow(-2, 31)
    : intVal > Math.pow(2, 31) - 1
    ? Math.pow(2, 31) - 1
    : intVal;
};

console.log(myAtoi('4193 with words'));
console.log(myAtoi('42'));
console.log(myAtoi('   -42'));
console.log(myAtoi('    words and 987'));
console.log(myAtoi('-91283472332'));
console.log(myAtoi('   +0 123'));
