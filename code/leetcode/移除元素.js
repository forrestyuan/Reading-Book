/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  if(nums.length == 0) return 0;
  if(nums.length == 1) return nums[0] == val ? 0 : 1;
  var tag = -1;
  for(var i = 0; i < nums.length; i++){
      if(nums[i] == val){
          if(tag == -1){
              tag = i;
              continue;
          }
      }else{
          if(tag != -1){
              nums[tag] = nums[i];
              ++tag;
          }
      }
  }
  return tag == -1 ? nums.length : tag;
};