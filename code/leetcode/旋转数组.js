/*
 * @Author: foxyuan 
 * @Date: 2021-10-27 13:39:23 
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-27 16:30:46
 */

/*
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
*/
/**
 * @description 利用双指针, 先反转整体，再反转局部
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//旋转数组
var rotate = function(nums, k) {
  if(nums.length <= 1 || k == 0 || k === nums.length) return nums;
  k = k > nums.length ? k%nums.length : k;
  //先反转整体
  revers(nums, 0, nums.length - 1)
  //后反转局部
  revers(nums,0, k-1)
  revers(nums,k, nums.length - 1)
  return nums;
};
var revers = function(arr, start, end){
  for(; start < end; ++start, --end){
    arr[start] = arr[start] ^ arr[end]
    arr[end] = arr[start] ^ arr[end]
    arr[start] = arr[start] ^ arr[end]
  }
}
console.log(rotate([1,2,3,4,5,6,7], 3))
console.log(rotate([-1,-100,3,99], 2))
console.log(rotate([1,2,3], 2))
console.log(rotate([1,2,3,4,5,6,7,8], 4))
console.log(rotate([1,2], 5))
