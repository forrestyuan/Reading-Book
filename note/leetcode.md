# leetcode 刷题

### Remove Duplicates from Sorted Array II
> Follow up for "Remove Duplicates": what if duplicates are allowed at most twice?  
> For example, Given sorted array A = [1,1,1,2,2,3,4,5,5],  
> Your function should return length = 8, A = [1,1,2,2,3,4,5,5]  

```javascript
/*时间复杂度：O(n) 空间复杂度O(1)*/
//数据
var a = [1,1,2,2,2,3,3,4,4,4,5,6,7,7,8,8];
//默认用于比较的第一个数组值
var index = 0;
// 阈值：允许的最大重复数量
var allowDuplicateNum = 2;
//记录重复的数量
var cur = 1;
//保存结果
var res = [a[0]];
for(var i = 1; i < a.length; i++){
    if(a[index] == a[i]){
        if(cur < allowDuplicateNum){
            res.push(a[i]);
            a[index] = a[i];
            cur ++;
            index = i;
        }else{
            index = i;
        }
    }else{
        res.push(a[i]);
        index = i;
        cur = 1;
    }
}
//将无用的 a 回收，释放空间
a = null;
console.log(res)
```

### Search in Rotated Sorted Array
> Suppose a sorted array is rotated at some pivot unknown to you beforehand  
> (i.e. 0 1 2  4 5 6 7 might become 4 5 6  7 0 1 2).  
> You are given a target value to search. if found in the array return its index,
> otherwise return -1  
> You may assume no duplicate exists in the array.  

```javascript
var arr = [4,5,6,7,0,1,2];
var target =  1;
function searchRSA(arr, n , target){
    var first = 0, last  = n;
    while(first != last){
        var mid = (first + last) / 2;
        if(arr[mid] == target) {
            return mid;
        }
        if(arr[first] < arr[mid]){
            if(arr[first] <= target && arr[mid] > target){
                last = mid;
            }else{
                first = mid + 1;
            }
        }else{
            if(arr[mid] < target && arr[last - 1] >= target){
                first = mid + 1;
            }else{
                last = mid;
            }
        }
    }
    return -1;
}
```