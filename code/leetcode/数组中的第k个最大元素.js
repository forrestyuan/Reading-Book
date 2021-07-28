/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  nums.sort(function(a,b){
    return a - b;
  });
  return nums[nums.length - k]
};

/*
@Todo: 1. 不调用库函数来实现
*/