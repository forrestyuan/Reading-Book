console.log('start');
//---------------------------------------------------------
//删除排序数组中的重复项目
/*
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

//---------------------------------------------------------
//买卖股票最佳时机
/*
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

//---------------------------------------------------------
//旋转数组
/*
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

//---------------------------------------------------------
//存在重复元素
/*
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

//---------------------------------------------------------
//只出现一次的数字
/*
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
/*
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
*/

//---------------------------------------------------------
//加一
/*
var plusOne = function(digits) {
   revers(digits)
   var addNext = 0;
   digits[0] +=1;
  for(var i = 0; i < digits.length ; i++){
    var val = digits[i] + addNext;
    digits[i] = val >= 10 ? val - 10 : val
    addNext = val >= 10 ? 1 : 0;
    if(i + 1 === digits.length && addNext === 1){
      digits.push(0)
    }
  }
  revers(digits)
  return digits
};
var revers = function(arr){
  for(var i = 0; i < arr.length; i++){
    var end = arr.length - i - 1
    if(i < arr.length - i - 1){
      arr[i] = arr[i] ^ arr [end]
      arr[end] = arr[i] ^ arr [end]
      arr[i] = arr[i] ^ arr [end]
    }
  }
}

console.log(plusOne([1,2,3]))
console.log(plusOne([1,2,9]))
console.log(plusOne([9]))
console.log(plusOne([0]))
console.log(plusOne([9,9,9,9]))
*/

//---------------------------------------------------------
//移动零
/*
var moveZeroes = function (nums) {
  if (nums.length < 2) return nums;
  var start = 0;
  var end = start + 1;

  while (start < nums.length) {
    // 如果start不为0
    if (nums[start] !== 0) {
      start++;
      end = start + 1;
    } else {
      if (end >= nums.length) {
        start++;
        end = start + 1;
      } else {
        if (nums[end] !== 0) {
          swap(nums, start, end);
        } else {
          end++;
        }
      }
    }
  }
  return nums;
};
var swap = function (nums, sub1, sub2) {
  nums[sub1] = nums[sub1] ^ nums[sub2];
  nums[sub2] = nums[sub1] ^ nums[sub2];
  nums[sub1] = nums[sub1] ^ nums[sub2];
};
console.log(moveZeroes([0, 1, 0, 3, 12]));
console.log(moveZeroes([0, 0, 0, 0, 12]));
console.log(moveZeroes([0, 12]));
console.log(moveZeroes([13, 1, 3, 0, 5, 6, 0, 12]));
*/

//---------------------------------------------------------
//有效的数独
/*
var isValidSudoku = function (board) {
  let row = new Array(9).fill(0);
  let col = new Array(9).fill(0);
  let square = new Array(9).fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let val = board[r][c];
      if (val !== '.') {
        let squareIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        let uniqueVal = 1 << Number(val); //利用位，使得值的唯一性，本题有 9 为，1<<1,1<<2,1<<3,....,1<<9（最多32位，超出32位无法进行位运算，需要降位处理)
        if (
          row[r] & uniqueVal ||
          col[c] & uniqueVal ||
          square[squareIndex] & uniqueVal
        ) {
          return false;
        }
        // 累存数据：eg: 0111 =  0100 | 0010 | 0001
        row[r] |= uniqueVal;
        col[c] |= uniqueVal;
        square[squareIndex] |= uniqueVal;
      }
    }
  }
  return true;
};

console.log(
  isValidSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ]),
);
*/

//---------------------------------------------------------
//旋转图像

var rotate = function (matrix) {
  if (matrix.length === 1 && matrix[0].length === 1) return matrix;
  let len = matrix.length;
  for (let r = 0; r < len / 2; r++) {
    for (let c = r; c < len - r - 1; c++) {
      let temp = matrix[r][c];
      let followRow = len - r - 1; // 跟随行变化
      let followCol = len - c - 1; // 跟随列变化
      matrix[r][c] = matrix[followCol][r];  // 左上 = 左下
      matrix[followCol][r] = matrix[followRow][followCol]; // 左下 = 右下
      matrix[followRow][followCol] = matrix[c][followRow]; // 右下 = 右上
      matrix[c][followRow] = temp; //右上 = 左上
    }
  }
  return matrix
};

console.log(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]))