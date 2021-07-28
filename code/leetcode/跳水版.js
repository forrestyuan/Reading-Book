/*
你正在使用一堆木板建造跳水板。有两种类型的木板，其中长度较短的木板长度为shorter，长度较长的木板长度为longer。
你必须正好使用k块木板。编写一个方法，生成跳水板所有可能的长度。

输入：
shorter = 1
longer = 2
k = 3
输出： {3,4,5,6}
*/
/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function(shorter, longer, k) {
  var res = [];
  if(k == 0) return res;
  for(var i = 0; i <= k; i++){
      var preT = res[res.length - 1];
      if(i == 0){
          res.push(shorter * k)
      }else if(i == k){
          var  t = longer * k 
          preT == t ? false : res.push(longer * k);
      }else{
          var t = (shorter * (k-i)) + (longer * i);
           preT == t ? false : res.push(t);
      }
  }
  return res;
};