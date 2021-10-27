/*
 * @Author: foxyuan
 * @Date: 2021-10-27 16:32:22
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-27 18:09:17
 */

/**
 * @description 解法一：利用对象相同属性会覆盖原理，模仿set，可以去重，最后判断长度确定是否有重复的。此法：空间和时间效率低下
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let obj = {};
  for (var i = 0; i < nums.length; i++) {
    obj[i] = i;
  }
  return Object.keys(obj).length !== nums.length;
};

/**
 * @description 解法一：利用set的去重特性，时间效率很高，但是空间效率低下
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  return Array.from(new Set(nums)).length !== nums.length;
};

//方法三： 先排序，后判断

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
