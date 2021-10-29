/*
 * @Author: foxyuan
 * @Date: 2021-10-27 18:09:07
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-28 16:00:21
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function (nums1, nums2) {
  if (nums1.length === 0 || nums2.length === 0) return [];
  var res = [];
  var maps = {};
  for (var i = 0; i < nums1.length; i++) {
    var val = maps[nums1[i]];
    maps[nums1[i]] = val >= 0 ? val + 1 : 1;
  }

  for (var j = 0; j < nums2.length; j++) {
    var mapsData = maps[nums2[j]];
    if (mapsData > 0) {
      res.push(nums2[j]);
      maps[nums2[j]] = mapsData - 1;
    }
  }
  return res;
};


console.log(intersect([1, 2, 2, 1], [2, 2]));
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]));
console.log(intersect([1, 2], [1, 1]));
console.log(intersect([3, 1, 2], [1, 1]));