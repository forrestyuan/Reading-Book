console.log('start');
/*
//---------------------------------------------------------
//删除排序数组中的重复项目
var removeDuplicates = function(nums) {
  if( nums.length <= 1) return nums.length;
  var cur = 0
  for(var i = 1; i < nums.length; i ++){
    if(nums[cur] !== nums[i]){
      cur++;
      nums[cur] = nums[i]
    } 
  }
  return cur + 1;
};

var nums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(nums), nums )
*/


/*
//---------------------------------------------------------
//买卖股票最佳时机
 var maxProfit = function(prices) {
    var res = 0;
    if(prices.length <= 1) return res;
    for(var i = 1; i < prices.length; i++){
      var profit = prices[i] - prices[i-1]
      if(profit > 0) res+=profit
    }
    return res;
};

console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit([1,2,3,4,5]))
console.log(maxProfit([7,6,4,3,1]))
*/

/*
//---------------------------------------------------------
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
*/

/*
//---------------------------------------------------------
//存在重复元素
var containsDuplicate = function(nums) {
  let obj = {};
  for(var i = 0; i<nums.length; i++){
    obj[nums[i]] = obj[nums[i]] ? obj[nums[i]] + 1 : 1;
  }
  return Object.keys(obj).length !== nums.length
};

var containsDuplicate = function(nums) {
  return Array.from(new Set(nums)).length !== nums.length
};

var mergeSort = function (arr) {
  //对半分割
  if (arr.length < 2) return arr;
  var mid = Math.floor(arr.length / 2);
  var arrLeft = arr.slice(0, mid);
  var arrRight = arr.slice(mid);

  //对半排序
  return merge(mergeSort(arrLeft), mergeSort(arrRight));
};
var merge = function (arrLeft, arrRight) {
  var res = [];
  while(arrLeft.length  && arrRight.length){
    res.push(arrLeft[0] > arrRight[0] ? arrRight.shift() : arrLeft.shift())
  }
  while(arrRight.length > 0){
    res.push(arrRight.shift())
  }
  while(arrLeft.length > 0){
    res.push(arrLeft.shift())
  }
  return res
};

var containsDuplicate = function (nums) {
  if(nums.length < 2) return false;
  var sortedNums = mergeSort(nums)
  for(var i = 1; i < sortedNums.length; i++){
    if(sortedNums[i] === sortedNums[i-1]) return true;
  }
  return false
};

console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))
console.log(containsDuplicate([1,2,3,4]))
*/

/*
//---------------------------------------------------------
//只出现一次的数字
var singleNumber = function(nums) {
  if(nums.length < 2) return nums[0];
  var res = 0;
  for(var i = 0; i < nums.length; i++){
    res ^= nums[i];
  }
  return res;
};
console.log(singleNumber([4,1,2,1,2]))
console.log(singleNumber([2,2,1]))
*/

//---------------------------------------------------------
//两个数的交集
var intersect = function (nums1, nums2) {
  if (nums1.length === 0 || nums2.length === 0) return [];
  
};

console.log(intersect([1,2,2,1],[2,2]))