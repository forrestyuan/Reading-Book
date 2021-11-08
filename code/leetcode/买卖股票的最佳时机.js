/**
 * @param {number[]} prices
 * @return {number}
 */
//暴力破解，效率极差，超时
 var maxProfit = function (prices) {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < prices.length; i++) {
    for(let j = i + 1; j < prices.length; j++){
      let tmp = (prices[j] - prices[i]);
      max = max > tmp ? max : tmp
    }
  }
  return max
};