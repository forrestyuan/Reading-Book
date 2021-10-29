/*
 * @Author: foxyuan 
 * @Date: 2021-10-28 16:01:25 
 * @Last Modified by: foxyuan
 * @Last Modified time: 2021-10-28 16:22:28
 */


/**
 * @param {number[]} digits
 * @return {number[]}
 */
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