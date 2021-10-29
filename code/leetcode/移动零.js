/*
 * @Author: foxyuan 
 * @Date: 2021-10-28 17:32:08 
 * @Last Modified by:   foxyuan 
 * @Last Modified time: 2021-10-28 17:32:08 
 */


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (nums.length < 2) return nums;
  var start = 0;
  var end = start + 1;

  while (start < nums.length) {
    // 如果start不为0
    if (nums[start] !== 0) {
      start++;
      end = start + 1;
    } else {
      if (end >= nums.length) {
        start++;
        end = start + 1;
      } else {
        if (nums[end] !== 0) {
          swap(nums, start, end);
        } else {
          end++;
        }
      }
    }
  }
  return nums;
};
var swap = function (nums, sub1, sub2) {
  nums[sub1] = nums[sub1] ^ nums[sub2];
  nums[sub2] = nums[sub1] ^ nums[sub2];
  nums[sub1] = nums[sub1] ^ nums[sub2];
};
console.log(moveZeroes([0, 1, 0, 3, 12]));
console.log(moveZeroes([0, 0, 0, 0, 12]));
console.log(moveZeroes([0, 12]));
console.log(moveZeroes([13, 1, 3, 0, 5, 6, 0, 12]));
