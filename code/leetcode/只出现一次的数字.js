/*
 * @Author: foxyuan 
 * @Date: 2021-10-27 17:52:56 
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-27 17:59:11
 */

/**
 * @description 利用位运算可以做到线性时间
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
  if(nums.length < 2) return nums[0];
  var res = 0;
  for(var i = 0; i < nums.length; i++){
    res ^= nums[i];
  }
  return res;
};
console.log(singleNumber([4,1,2,1,2]))