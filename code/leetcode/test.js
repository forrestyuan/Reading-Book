console.log('开始运行');
//---------------------------------------------------------
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

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
