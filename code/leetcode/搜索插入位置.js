/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

 //这个是 一层循环，O（N）
var searchInsert = function(nums, target) {
  //待插入的位置
  var insert = 0; 
  //如果数组长度为1
  if(nums.length == 1) return target <= nums[0] ? 0 : 1;
  //数组长度大于1;
  for(var i = 1; i < nums.length; i++){
      //如果target比当前i下标的前一个值要大
      if(target > nums[i - 1]){
          //如果target小于等于当前i下标的值
          if(target <= nums[i]){
              insert = i;
              break;
          }else{
              //如果target大于当前i下标的值，插入值前进一位
              insert = i + 1;
          }
      }else{ 
          //如果target小于等于当前i下标的前一个值，insert指向前一个值的下标。
          insert = i - 1;
          break;
      }
  }
  return insert;
};

//二分查找 O(LogN)

var searchInsert = function(nums, target) {
  //待插入的位置
  var insert = 0; 
  var start = 0, end = nums.length - 1;
  if(target <= nums[start]) return 0;
  if(target > nums[end]) return end + 1;
  //数组长度大于1;
  while(start <= end){
      if(start == end){
          return target <= nums[start] ? start : start + 1;
      }
      var mid = parseInt((start + end) / 2);
      if(nums[mid] == target) return mid;
      if(target < nums[mid]){
          if(start == mid) return mid;
          end = mid;
      }else{
          start = mid + 1; 
      }
  }
  return insert;
};