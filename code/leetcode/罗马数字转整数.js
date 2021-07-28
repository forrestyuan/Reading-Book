/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  var romaMap = { "I": 1, "IV": 4, "V": 5, "IX": 9, "X": 10, "XL": 40, "XC": 90, "L": 50, "CD": 400, "C": 100, "D": 500, "CM": 900, "M": 1000 },
      res = 0;
  for (var i = 0; i < s.length; i++) {
    var one = s.charAt(i) ,two = one + s.charAt(i + 1);
    if(!!romaMap[two]){
      res+=romaMap[two];
      ++i;
      continue
    }
    res+=romaMap[one]
  }
  return res;
};
//解法二： 使用switch
var romanToInt = function (s) {
  var getVal = function(key){
    switch(key){
      case "I" : return 1;
      case "IV": return 4;
      case "V": return 5;
      case "IX": return 9;
      case "X": return 10;
      case "XL": return 40;
      case "XC": return 90;
      case "L": return 50;
      case "CD": return 400;
      case "C": return 100;
      case "D": return 500;
      case "CM": return 900;
      case "M": return 1000;
    }
  }
  var res = 0;
  for (var i = 0; i < s.length; i++) {
    var one = s.charAt(i) ,two = getVal(one + s.charAt(i + 1));
    
    if(!!two){
      res += two;
      ++i;
      continue
    }
    res+=getVal(one);
  }
  return res;
};

/* var romanToInt = function (s) {
  var romaMap = { "I": 1, "IV": 4, "V": 5, "IX": 9, "X": 10, "XL": 40, "XC": 90, "L": 50, "CD": 400, "C": 100, "D": 500, "CM": 900, "M": 1000 },
      res = 0,
      s = s.split("");
  for (var i = 0; i < s.length; i++) {
    var one = s[i] ,two = one + s[i + 1];
    if(!!romaMap[two]){
      res+=romaMap[two];
      ++i;
      continue
    }
    res+=romaMap[one]
  }
  return res;
}; */

//优化后
var romanToInt = function (s) {
  var romaMap = { "I": 1, "IV": 4, "V": 5, "IX": 9, "X": 10, "XL": 40, "XC": 90, "L": 50, "CD": 400, "C": 100, "D": 500, "CM": 900, "M": 1000 },
      res = 0;
  for (var i = 0; i < s.length; i++) {
    var one = s.charAt(i), two = one + s.charAt(++i);
    res += (!!romaMap[two]) ? romaMap[two] : (--i)-(i)+romaMap[one];
  }
  return res;
};
