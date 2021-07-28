
//解法一
var twoSum = function (nums, target) {
  //如果长度为2
  if (nums.length == 2) {
    return nums[0] + nums[1] == target ? [0, 1] : [];
  }
  var map = {};
  for (var i = 0; i < nums.length; i++) {
    if (map["t" + nums[i]] != undefined) {
      if (2 * nums[i] == target) {
        return [map["t" + nums[i]], i]
      }
    } else {
      map["t" + nums[i]] = i;
    }
  }
  var res = [];
  for (var k = 0; k < nums.length; k++) {
    var a = map["t" + nums[k]],
      b = map["t" + (target - nums[k])];
    if (a != undefined && b != undefined && a != b) {
      a < b ? res.push(a, b) : res.push(b, a);
      break;
    }
  }
  return res;
};
//解法二
var twoSum2 = function (nums, target) {
  var map = {};
  for (var i = 0; i < nums.length; i++) {
    var a = i, b = map[target - nums[i]];
    if (b != undefined) return [b, a];
    if (map[nums[i]] == undefined) map[nums[i]] = i;
  }
};
//测试用例
console.log("解法一")
console.log(twoSum([2, 7, 11, 15], 26));
console.log(twoSum([2, 5, 0, 15], 2));
console.log(twoSum([2, 11, 1, 15], 17));
console.log(twoSum([2, 11, 2, 15], 4));
console.log(twoSum([2, 11, 2, 15], 13));
console.log(twoSum([-2, 4, 2, 90], 0));
console.log(twoSum([-2, -4, 2, 90], -6));
console.log("解法二")
console.log(twoSum2([2, 7, 11, 15], 26));
console.log(twoSum2([2, 5, 0, 15], 2));
console.log(twoSum2([2, 11, 1, 15], 17));
console.log(twoSum2([2, 11, 2, 15], 4));
console.log(twoSum2([2, 11, 2, 15], 13));
console.log(twoSum2([-2, 4, 2, 90], 0));
console.log(twoSum2([-2, -4, 2, 90], -6));