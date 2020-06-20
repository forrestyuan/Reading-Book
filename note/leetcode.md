<!-- TOC -->

- [leetcode 刷题](#leetcode-刷题)
  - [排序算法:](#排序算法)
    - [工具函数](#工具函数)
    - [冒泡排序](#冒泡排序)
    - [选择排序](#选择排序)
    - [插入排序](#插入排序)
    - [希尔排序](#希尔排序)
    - [归并排序](#归并排序)
      - [递归版本js版本](#递归版本js版本)
      - [递归java版本](#递归java版本)
      - [迭代版本 C++](#迭代版本-c)
      - [迭代版本 javascript](#迭代版本-javascript)
    - [快速排序](#快速排序)
  - [排序算法稳定性](#排序算法稳定性)
  - [二叉搜索树](#二叉搜索树)
  - [leetcode Questions list（刷题题目）](#leetcode-questions-list刷题题目)
    - [Remove Duplicates from Sorted Array II](#remove-duplicates-from-sorted-array-ii)
    - [Search in Rotated Sorted Array](#search-in-rotated-sorted-array)
    - [两数之和](#两数之和)

<!-- /TOC -->
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


## 排序算法:
> commonly there have lost of sorted function to match different situation;  
> As an eligible programer developer, to grasp the sorted algorithm is needed;  
> Below was the code of different sorted function write in javascript;  
> 💪😀🤜

>**☞排 序 算 法 稳 定 概 念：**  
> 对于不稳定的排序算法，只要举出一个实例，即可说明它的不稳定性；而对于稳定的排序算法，必须对算法进行分析从而得到稳定的特性。需要注意的是，排序算法是否为稳定的是由具体算法决定的，不稳定的算法在某种条件下可以变为稳定的算法，而稳定的算法在某种条件下也可以变为不稳定的算法。

例如，对于冒泡排序算法，原本是稳定的排序算法，如果将记录交换的条件改成r[j]>=r[j+1]，则两个相等的记录就会交换位置，从而变成不稳定的算法。
### 工具函数
```js
/**
** util function: exchange two value in array;
**/
var exchangeELe = function(arr, idx1, idx2){
	var t = arr[idx1];
	arr[idx1] = arr[idx2];
    arr[idx2] = t;
}
```
### 冒泡排序
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
### 选择排序
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

### 插入排序
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
```js
//在变量的配置上，可以更加精简
function insertion(arr){
    //外循环遍历未排序的值
    for(var i = 1; i < arr.length; i++){
        //内循环遍历已排序的值
        for(var j = i; j >= 0; j--){
            if(arr[j-1] > arr[j]){
                //交换符合条件的值，将有序序列中下标为j的值与无序序列中挑选的的被交换值交换
                exchangeEle(arr, j, j-1);
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

### 希尔排序
希尔排序是一种递减增bai量的排序算法  
排序原理：  

1. 选定一个增长量h， 按照增长量h作为数据分组的依据，对数据进行分组
2. 对分好的每一组数据完成插入排序
3. 较小增长量，最小减为1，重复第二步操作。

> 增长量h的确定：
```js
    //确定h的初始值
    var h = 1;
    while(h < 数组的长度 / 2){
        h = 2*h +1;
    }
    //每次h的递减规则
    h = h / 2;

```

```js
    function shell(arr){
        //确定h增长量
        var h = 1;
        while(h < Math.floor(arr.length/2)){
            h = 2*h + 1;
        }
        //进行希尔排序
        while( h >= 1){
            //排序
            for(var i = h; i < arr.length; i++){
                for(var j = i; j >= h; j-=h){
                    if(arr[j] < arr[j-h]){
                        console.log('exchange run, current h: '+h);
                        exchangeELe(arr,j, j - h);
                    }else{
                        break;
                    }
                }
            }
            //减小h的值
            h = Math.floor(h / 2);
        }

    }
    var arrs = [4,3,2,10,12,1,5,6]
    shell(arrs)
```

### 归并排序
将数组不断对半分割，直到只剩一个元素，然后排序合并。  

**迭代法**  
① 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列  
② 设定两个指针，最初位置分别为两个已经排序序列的起始位置  
③ 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置  
④ 重复步骤③直到某一指针到达序列尾  
⑤ 将另一序列剩下的所有元素直接复制到合并序列尾  

**递归法**  
① 将序列每相邻两个数字进行归并操作，形成floor(n/2)个序列，排序后每个序列包含两个元素  
② 将上述序列再次归并，形成floor(n/4)个序列，每个序列包含四个元素  
③ 重复步骤②，直到所有元素排序完毕  

![归并排序](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/20180812232926378.gif)  
![归并排序](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/归并排序.png)  
![归并排序](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/merge过程.png)  

#### 递归版本js版本
```js
    function merge(arr, start, mid, end){
        var p1 = start; //左子序列游标
        var p2 = mid + 1; //右子序列游标
        var k = start; // 辅助数组序列游标
        var auxList = []; // 辅助数组

        while(p1 <= mid && p2 <= end){
            auxList[k++] = arr[p1] <= arr[p2] ?  arr[p1++] : arr[p2++];
        }
        //如果左子序列有剩余的，直接将后面所有元素添加到合并序列中
        while(p1 <= mid){
            auxList[k++] = arr[p1++];
        }
        //如果右子序列有剩余的，直接将后面所有元素添加到合并序列中
        while(p2 <= end){
            auxList[k++] = arr[p2++];
        }
        //复制回原数组
        for(var j = start; j <= end; j++){
            arr[j] = auxList[j]
        }
        //测试的
         console.log('第'+(++arr.runTimes)+"次合并,从"+start+"到"+end+"的下标，合并后为："+arr);
    }
    function mergeSort(arr, start, end){
        //当子序列中只剩一个元素退出
        if(start >= end){
            return void 0;
        }
        //划分子序列
        var mid = parseInt((start + end) / 2); 
        //左子序列继续递归划分
        mergeSort(arr, start, mid);
        //右子序列继续递归划分
        mergeSort(arr, mid+1, end);
        //排序合并
        console.log(arr+"===start:"+start+"==mid:"+mid+"==end:"+end)
        merge(arr, start, mid, end)
    }

    function TestMergeSort(){
        var arrs=[9,8,7,6,5,4,3,2,1];
        arrs.runTimes=0;
        mergeSort(arrs, 0, arr.length-1);
        console.log(arrs)
    }
```
**测试结果     mid = (start + end)/ 2;**  
>9,8,7,6,5,4,3,2,1===start:0==mid:0==end:1  
>第1次合并,从0到1的下标，合并后为：8,9,7,6,5,4,3,2,1

>8,9,7,6,5,4,3,2,1===start:0==mid:1==end:2    
>第2次合并,从0到2的下标，合并后为：7,8,9,6,5,4,3,2,1

>7,8,9,6,5,4,3,2,1===start:3==mid:3==end:4  
>第3次合并,从3到4的下标，合并后为：7,8,9,5,6,4,3,2,1

>7,8,9,5,6,4,3,2,1===start:0==mid:2==end:4  
>第4次合并,从0到4的下标，合并后为：5,6,7,8,9,4,3,2,1

>5,6,7,8,9,4,3,2,1===start:5==mid:5==end:6  
>第5次合并,从5到6的下标，合并后为：5,6,7,8,9,3,4,2,1

>5,6,7,8,9,3,4,2,1===start:7==mid:7==end:8  
>第6次合并,从7到8的下标，合并后为：5,6,7,8,9,3,4,1,2

>5,6,7,8,9,3,4,1,2===start:5==mid:6==end:8  
>第7次合并,从5到8的下标，合并后为：5,6,7,8,9,1,2,3,4

>5,6,7,8,9,1,2,3,4===start:0==mid:4==end:8  
>第8次合并,从0到8的下标，合并后为：1,2,3,4,5,6,7,8,9

#### 递归java版本
```java
 //两路归并算法，两个排好序的子序列合并为一个子序列
    public void merge(int []a,int left,int mid,int right){
        int []tmp=new int[a.length];//辅助数组
        int p1=left,p2=mid+1,k=left;//p1、p2是检测指针，k是存放指针

        while(p1<=mid && p2<=right){
            if(a[p1]<=a[p2])
                tmp[k++]=a[p1++];
            else
                tmp[k++]=a[p2++];
        }

        while(p1<=mid) tmp[k++]=a[p1++];//如果第一个序列未检测完，直接将后面所有元素加到合并的序列中
        while(p2<=right) tmp[k++]=a[p2++];//同上

        //复制回原素组
        for (int i = left; i <=right; i++) 
            a[i]=tmp[i];
    }

    public void mergeSort(int [] a,int start,int end){
        if(start<end){//当子序列中只有一个元素时结束递归
            int mid=(start+end)/2;//划分子序列
            mergeSort(a, start, mid);//对左侧子序列进行递归排序
            mergeSort(a, mid+1, end);//对右侧子序列进行递归排序
            merge(a, start, mid, end);//合并
        }
    }

```
#### 迭代版本 C++
归并排序的递归实现会占用大量的时间和空间，算法的效率低下；使用迭代的方式代替递归的方式虽然比较难想，但是会提高效率。
```
            [3    7    6    4    8    9    2]
             |    |    |    |    |    |    |
            [3]  [7]  [6]  [4]  [8]  [9]  [2]
              \  /      \   /     \  /     |
            [3    7]  [4    6]  [8    9]  [2]
                \        /          \      /
                 \      /            \    / 
            [  3   4   6   7 ]  [ 2   8   9 ]
                    \                  /
                     \                /
            [  2   3   4   6   7    8    9  ]
```
根据上面的图，可以先把数组划分为`n`组, 刚开始每组只有一个值。然后相邻的小组不断进行两两合并，最终合并成为一个组。
可以用一个变量来枚举步长1,2,4.....n，对由每个步长分开的区间，都合并一下。
比如，一开始数组为`[8 7 6 5 4 3 2 1]`。  

第一遍，步长为1，将相邻的两个区间合并：   
`7 8` 6 5  4 3 2 1   
 7 8 `5 6` 4 3 2 1   
 7 8 5 6 `3 4` 2 1   
 7 8 5 6  3 4 `1 2`  

第二遍，步长为2，将相邻的两个区间合并：   
`5 6 7 8` 3 4 1 2   
 5 6 7 8 `1 2 3 4`  

第三遍，步长为4，将相邻的两个区间合并：   
`1 2 3 4 5 6 7 8`  

> 步长是外层循环，以步长为基本单位的每一对分组经过排序形成新的double分组，不断迭代是内层循环。
```c++
#include<iostream>
#include<vector>
 
using namespace std;
 
// 区间[head1, head2-1]和[head2, tail2]都是排好序的，现在需要合并
void mergeSortHelper(vector<int>& v, int head1, int head2, int tail2) {
    int tail1 = head2 - 1, index = 0, len = tail2 - head1 + 1, start = head1;
    vector<int> tmp(len);
    while (head1 <= tail1 || head2 <= tail2) {
        if (head1 > tail1)
            tmp[index++] = v[head2++];
        else if (head2 > tail2)
            tmp[index++] = v[head1++];
        else {
            if (v[head1] <= v[head2])
                tmp[index++] = v[head1++];
            else
                tmp[index++] = v[head2++];
        }
    }
    
    for (int i = 0; i < len; ++i)
        v[start+i] = tmp[i];
}
 
void mergeSort(vector<int>& v) {
    int len = v.size();
    // 倍进枚举步长1,2,4,……
    for (int step = 1; step <= len; step <<= 1) {
        int offset = step + step;
        for (int index = 0; index < len; index += offset)
            mergeSortHelper(v, index, min(index+step, len-1), min(index+offset-1, len-1));
    }
}
 
int main(){
    vector<int> a = {3,1,2,4,5,8,7,6};
    mergeSort(a);
    for(int i=0;i<8;++i)
        cout<<a[i]<<" ";
}
```
#### 迭代版本 javascript
```js
var merge = function(arr, start, mid, end){
        var p1 = start; //左子序列游标
        var p2 = mid + 1; //右子序列游标
        var k = start; // 辅助数组序列游标
        var auxList = []; // 辅助数组

        while(p1 <= mid && p2 <= end){
            auxList[k++] = arr[p1] <= arr[p2] ?  arr[p1++] : arr[p2++];
        }
        //如果左子序列有剩余的，直接将后面所有元素添加到合并序列中
        while(p1 <= mid){
            auxList[k++] = arr[p1++];
        }
        //如果右子序列有剩余的，直接将后面所有元素添加到合并序列中
        while(p2 <= end){
            auxList[k++] = arr[p2++];
        }
        //复制回原数组
        for(var j = start; j <= end; j++){
            arr[j] = auxList[j]
        }
        //测试的
         console.log('第'+(++arr.runTimes)+"次合并,从"+start+"到"+end+"的下标，合并后为："+arr);
    }
    var mergeSort = function(arr){
        //枚举步长
        for(var step = 1; step <= arr.length; step<<=1){
            var offset = step * 2; // 偏移量，每次都是处理相邻的两个步长为 i 的序列
            for(var start = 0; start < arr.length; start+=offset){
                var end = (start + offset - 1) >= arr.length ? (arr.length -1) : (start + offset - 1);// 防止越界
                var mid =  (start + end) >> 1;
                console.log(start, mid, end)
                merge(arr, start, mid, end );
            }
        }
    }
    var arrs = [9,8,7,6,5,4,3];
        arrs.runTimes = 0;
    mergeSort(arrs)
```
### 快速排序
**排序原理**  
1. 首先设定一个分界值，通过该分界值将数组分成左右两部分;
2. 将大于或等于分界值的数据放到数组右边，小于分界值的数据放到数组的左边。此时左边部分中各元素都小于或等于分界值，而右边部分中各元素都大于或等于分界值
3. 然后，左边和右边的数据可以独立排序。对于左侧的数据，又可以取一个分界值，将该部分数据分成左右部分，同样在左边放置较小值，右边放置较大值。右侧的数据也做类似处理。
4. 重复上述过程，可以看出，这是一个递归定义。通过定义左侧部分排好序后，再递归排好右侧部分的顺序。当左侧和右侧两个部分的数据排完序后，整个数组的排序也就完成了。

归并排序是分之思想的最典型的例子，上面的算法中，对a[0...n]进行排序，现将它分为a[0...mid]和a[mid+1...n]两部分，分别通过递归调用将他们单独排序，最后将有序的子数组归并为最终的排序结果。



**切分原理（重点）**

1. 找一个基准值，用两个指针分别指向数组的头部和尾部
2. 先从尾部向头部开始搜索一个比基准值小的元素，搜索到即停止，并记录指针的位置；
3. 再从头部到尾部开始搜索一个比基准值大的元素，搜索到即停止，并记录指针的位置；
4. 交换当前左边指针位置和右边指针位置的元素；
5. 重复2,3,4步骤，直到左边指针的值大于右边的值停止；

```javascript
  var sort = function(a, start, end){
      if(start >= end){
          return;
      }
      //需要对数组中start索引到end索引处的元素进行分组（左子组和右子组）
      var splitIndex = partition(a, start, end);
      //让左子组有序
      sort(a, start, splitIndex - 1);
	  //让右子组有序
      sort(a,splitIndex + 1, end);
  }
	
   var partition = function(a, start, end){
       //分界值
       var key = a[start];
       //定义两个指针，分别指向待切分元素的最小所引处和最大索引处的下一个位置
       var p1 = start, p2 = end;
       //切分
       while(p1 < p2){
           //接着从右往左扫描，直到找到比分界值小的元素
           while(p1 < p2 && a[p2] >= key){
               p2--;
           }
	       //先从左往右扫描，直到找到比分界值大的元素
           while(p1<p2 && a[p1] <= key){
               p1++;
           }
           //交换p1和p2索引处元素
           if(p1 < p2){
				exchangeEle(a, p1, p2);
           }
       }
       //最后分界值和p1 或 p2索引处元素交换
        exchangeEle(a, start,p1)   
       return p1;
   }
var arr = [9,8,7,6,5,4,3,2,1];
sort(arr, 0, arr.length - 1) 


```

## 排序算法稳定性

* 冒泡排序： 当交换判断条件包含相等的情况时，是不稳定的，反之是稳定的，**通常的实现情况是稳定的。**
* 选择排序：不稳定【5(1),3,5(2), 2】，因为5(1)会跟2交换，改变了5(1)和5(2)的顺序。
* 插入排序：当交换判断条件包含相等的情况时，是不稳定的，反之是稳定的，**通常的实现情况是稳定的。**
* 希尔排序：不稳定；【4，1，5，3，7，2(1)，1，2(2)】=》【1，2(2)，5，3，7，2(1)，4，1】
* 归并排序：稳定的
* 快速排序：不稳定；[45,53,18,36(1),72,30,48,90,15,36(2)]=>[30,36(2),18,36(1),15] 45 [48,93,72,53]

## 二叉搜索树
[代码](https://github.com/forrestyuan/Reading-Book/tree/master/code/tree.js)

## leetcode Questions list（刷题题目）
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
### 两数之和
**解题思路**  
一开始最先想到的就是使用暴力搜索，这种情况下时间复杂度为：O(n^2),自然是不可接受的。
这道题可以使用map的数据结构来解决，将时间复杂度降到O(n), 不过空间复杂度也为O(n)。
1. 遍历整个数组，在添加遍历的当前值`{value:index1}`到map之前，先判断一下map里有没有`{(target-value):index2}`
    * 如果找到了就直接返回`[index2, index1]`，程序终止。
    * 如果没有找到，就继续第2步骤
2. 此时将遍历的当前值`{value:index1}`添加到map，添加之前需要判断map中key为`value`的键值对是否存在
    * 如果存在不再添加进去，继续执行第1步骤  
    
**代码**  
[两数之和代码](https://github.com/forrestyuan/Reading-Book/tree/master/code/两数之和.js)
