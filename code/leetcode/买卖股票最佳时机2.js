/**
 * @description 贪心算法解决：计算相隔两天的利润，如果利润大于0，那么就可以累加保存起来，最后累加的结果就是可能的最大利润。
 * @param {number[]} prices
 * @return {number}
 */

 var maxProfit = function(prices) {
  var res = 0;
  if(prices.length <= 1) return res;
  for(var i = 1; i < prices.length; i++){
    var profit = prices[i] - prices[i-1]
    if(profit > 0) res+=profit
  }
  return res;
};

console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit([1,2,3,4,5]))
console.log(maxProfit([7,6,4,3,1]))