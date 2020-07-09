/**
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