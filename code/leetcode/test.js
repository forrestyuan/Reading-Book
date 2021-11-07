console.log('开始运行');
//---------------------------------------------------------
var merge = function (nums1, m, nums2, n) {
  let a = 0, b = 0;
  while (a < m + n) {
    if (nums1[a] > nums2[b]) {
      swap(nums1, a, nums2, b)
      console.log(nums1)
    } else if (nums1[a] === 0) {
      nums1[a] = nums2[b]
      b++;
      console.log(nums1)
    }
    a++
  }
};

var swap = function (nums, a, nums2, b) {
  nums[a] = nums[a] ^ nums2[b];
  nums2[b] = nums[a] ^ nums2[b];
  nums[a] = nums[a] ^ nums2[b];
}
let nums1 = [4, 5, 6, 0, 0, 0];
let nums2 = [1, 2, 3];
console.log(merge(nums1, 3, nums2, 3))
console.log(nums1)