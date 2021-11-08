/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function (nums1, m, nums2, n) {
  let a = 0, b = 0;
  let res = [];
  while (a < m && b < n) {
    res.push(nums1[a] < nums2[b] ? nums1[a] : nums2[b]);
    nums1[a] < nums2[b] ? a++ : b++
  }
  while(a < m) {
    res.push(nums1[a])
    a++
  }
  while(b < n){
    res.push(nums2[b])
    b++
  }
  a = 0
  while(a<m+n){
    nums1[a] = res[a]
    a++
  }
};
// 不实用额外变量
var merge = function (nums1, m, nums2, n) {
  let res = [];
  m--,n--;
  while (m >= 0 && n >= 0) {
    res.unshift(nums1[m] > nums2[n] ? nums1[m] : nums2[n]);
    nums1[m] > nums2[n] ? m-- : n--
  }
  while(m>=0) {
    res.unshift(nums1[m])
    m--
  }
  while(n>=0){
    res.unshift(nums2[n])
    n--
  }
  m = 0
  while(m < res.length){
    nums1[m] = res[m]
    m++
  }
};
let nums1 = [0];
let nums2 = [1];
merge(nums1, 0, nums2, 1);
console.log(nums1)