# leetcode 刷题

 描述      | 增长的数量级|  说明        |  举例         
 ----      | -----      | ----        |  -----           
 常数级别   | 1          |   普通语句   |  将两个数相加   
 对数级别   | logN       |  二分策略    |  二分查找       
 线性级别   | N          |  循环       |   找出最大元素   
 线性对数级别| NlogN     |    分治思想  |   归并排序        
 平方级别   | N^2        |   双层循环    |  检查所有元素对 
 立方级别   | N^3        |   三层循环    |  检查所有三元组 
 指数级别   | 2^N        |   穷举查找    |  检查所有子集   
> O(1) < O(logN) < O(N) < O(NlogN) < O(n^2) < O(n^3) < O(2^N)

### sort function list:
> commonly there have lost of sorted function to match different situation;  
> As an eligible programer developer, to grasp the sorted algorithm is needed;  
> Below was the code of different sorted function write in javascript;  
> 💪😀🤜

>**☞排 序 算 法 稳 定 概 念：**  
> 对于不稳定的排序算法，只要举出一个实例，即可说明它的不稳定性；而对于稳定的排序算法，必须对算法进行分析从而得到稳定的特性。需要注意的是，排序算法是否为稳定的是由具体算法决定的，不稳定的算法在某种条件下可以变为稳定的算法，而稳定的算法在某种条件下也可以变为不稳定的算法。

例如，对于冒泡排序算法，原本是稳定的排序算法，如果将记录交换的条件改成r[j]>=r[j+1]，则两个相等的记录就会交换位置，从而变成不稳定的算法。
#### :capsule util function
```js
/**
** util function: exchange two value in array;
**/
function exchangeELe(arr, idx1, idx2){
    arr[idx1] = arr[idx1] ^ arr[idx2];
    arr[idx2] = arr[idx1] ^ arr[idx2];
    arr[idx1] = arr[idx1] ^ arr[idx2];
}
```
#### 1. BubbleSort Function
```js
//两两交换
/*
* 升序场景下：
* 1. 比较相邻元素，如果前一个元素比后一个元素大，就交换这两个元素的位置
* 2. 对每一对相邻元素做同样工作，从开始第一对元素到结尾最后一对元素。最终最后位置的元素就是最大值。
*/
function bubbleSort(arr){
    for(var i = 0; i < arr.length; i++){
        for(var j = i; j < arr.length; j++){
            arr[i] > arr[j] ? exchangeELe(arr, i, j) : false;
        }
    }
}
var arrs = [6,5,4,3,2,1];
bubleSort(arrs);
console.log(arrs) //output:[1,2,3,4,5,6]
```
#### 2. SelectionSort Function 
```js
// 每次找最小的值交换
/*
* 升序场景下：
* 1. 每一次遍历过程中，都假定第一个索引处元素是最小值，和其它未排序的索引处的值依次进行比较，
     如果当前索引处的值大于其他某个索引处的值，则假定其他某个索引处的值为最小值，最后可以找
     到最小值所在的索引。
* 2. 交换第一个索引处和最小值所在的索引处的值
*/

function selectSort(arr){
    for(var i = 0; i < arr.length - 1; i++ ){
        var minIndex = i;
        for(var j = i + 1; j < arr.length; j++){
            minIndex = arr[minIndex] > arr[j] ? j : minIndex;
        }
        minIndex != i ? exchangeEle(arr, i, minIndex) : false;
    }
}
var arrs = [4,6,8,7,9,2,10,1];
selectSort(arrs);
console.log(arrs); // output:[1,2,4,6,7,8,9,10]
```

#### InsertSort Function
插入排序的工作方式非常像人们排序一手扑克牌一样。开始时，我们的左手为空并且座子上的牌面朝下。然后，我们每次从桌子上拿走一张扑克牌并将它们插入左手中正确的位置。为了找到一张牌的正确位置，我们从右到左将它与已在手中的每张牌进行比较，如下图：  
![手握扑克牌](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/insertSort.jpg)  
```js
/*
1. 把所有元素分为两组，已排序的和未排序的
2. 找到未排序组中的第一个元素，向已经排序的组中进行插入
3. 倒叙遍历已经排序的元素，依次和待插入的元素进行比较，直到找到一个元素小于等于待插入元素，
   那么就把待插入元素放到这个位置。如下图为流程：
*/
```
![插入排序流程](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/insertSort2.jpg)  

```js
function insertion(arr){
    //外循环遍历未排序的值
    for(var i = 1; i < arr.length; i++){
        //indexForChange 存储无序序列中挑选的被交换的值的下标
        var indexForChange = i;
        //内循环遍历已排序的值
        for(var j = i - 1; j >= 0; j--){
            if(arr[j] > arr[indexForChange]){
                //交换符合条件的值，将有序序列中下标为j的值与无序序列中挑选的的被交换值交换
                exchangeEle(arr, j, indexForChange);
                //更新从无序序列中挑选的被交换的值的下标
                indexForChange = j;    
            }else{
                break;
            }
        }
    }
}
var arrs = [4,3,2,10,12,1,5,6]
insertion(arrs);
console.log(arrs) //output:[1,2,3,4,5,6,10,12]
```

**********************************

<p style="text-align:center;font-weight:700;font-size:20px;color:red;"> I am the split line 👌</p>  

**********************************
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
/**
 ** 方法一：
 ** 使用while 循环方式实现
 **/
function searchRSA(arr, n , target){
    var first = 0, last  = n;
    while(first != last){
        //每次取下标中值
        var mid = Math.floor((first + last) / 2);
        //循环退出条件，找到目标值。
        if(arr[mid] == target) {
            return mid;
        }
        //在有序区域
        if(arr[first] <= arr[mid]){
            //判断是否在有序区域
            if(arr[first] <= target && target < arr[mid]){
                last = mid;
            }else{
                first = mid + 1;
            }
        }else{// 在无序区域
            //仍旧判断是否在有序区域
            if(arr[mid + 1] <= target && target <= arr[last - 1]){
                first = mid + 1;
            }else{
                last = mid;
            }
        }
    }
    return -1;
}

/**
 ** 方法二：
 ** 使用递归方式实现 
 **/
function retriveSearch(list, start, end, target){
   // 递归推出条件
    if(start == end){
        return list[start] == target ? start - 1 : -1;
    }
    var mid = Math.floor((start + end) / 2);
     console.log("run mid:" + mid)
     //找到目标值退出递归
    if(list[mid] == target){
        return mid;
    }
    if(list[start] <= list[mid]){
        if(list[start] <= target && target < list[mid]){
            return retriveSearch(list, start, mid + 1, target);
        }else{
            return retriveSearch(list,mid + 1, end, target);
        }
    }else{
        if(list[mid + 1] <= target && target <= list[end - 1]){
            return retriveSearch(list, mid + 1, end, target);
        }else{
            return retriveSearch(list, start, mid + 1, target);
        }
    }
    
    
}
```
