/**
 * @description 利用双指针方法进行解决。tag为左指针，i为右指针
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(nums.length  <= 1) return nums.length;
  var tag = 0;
  for(var i = 1; i < nums.length; i++){
      if(nums[tag] != nums[i]){
          ++tag;
          nums[tag] = nums[i];
      }
  }
  return tag+1;
};
