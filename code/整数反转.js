/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    //split O(n) // reverse  O(n)  // join O(n) // slice O(n)
    if(x > -10 && x < 10) return x;
    var num = (""+x).split("").reverse();
    num = x < 0 ?  +("-"+(num.slice(0, num.length - 1)).join("")) : +(num.join(""));
    return  num >= -Math.pow(2,31) ? num <= (Math.pow(2,31) - 1) ? num : 0 : 0;
  };
  
var reverse2 = function(x){
    if(x > -10 && x < 10) return x;
    var isNegative = x < 0 ? true : false;
    var num = Math.abs(x);
    var n = 0;
    var res = [];
    while(true){
      var pre = num % Math.pow(10, n); 
      var cur = num % Math.pow(10, ++n);
      if(cur == pre && num * 10 < Math.pow(10,n)) break;
      res.push(cur - pre);
    }
    var value = 0;
    for(var i = 0, j = res.length - 1; i < res.length; i++, j--){
       value += res[i] / Math.pow(10, i) * Math.pow(10, j); 
    }
    value =  isNegative ? -value : value;
    return  value >= -Math.pow(2,31) ? value <= (Math.pow(2,31) - 1) ? value : 0 : 0;
}

var reverse3 = function(x){
  if(x > -10 && x < 10) return x;
  var result = 0;
  while(x != 0){
    result = result * 10 + x % 10;
    x = x < 0 ? Math.ceil(x / 10) : Math.floor(x / 10);
  }
  return  result >= -Math.pow(2,31) ? result <= (Math.pow(2,31) - 1) ? result : 0 : 0;
}