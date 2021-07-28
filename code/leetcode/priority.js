class MaxPriorityQueue {
  items = [];
  N = 0;
  //获取队列中元素的个数
  size() {
    return this.N;
  }
  //判断队列是否为空
  isEmpty() {
    return this.N == 0;
  }
  //判断队中索引 i 处的元素是否小于索引 j 处的元素
  less(i, j) {
    return this.items[i] < this.items[j];
  }
  //交换队中两个索引处的元素i,j
  exchange(i, j) {
    let t = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = t;
  }
  //往堆中插入一个元素
  insert(ele) {
    this.items[++this.N] = ele;
    this.swim(this.N);
  }
  //删除堆中最大的元素，并返回这个最大元素
  delMax() {
    let max = this.items[1];
    this.exchange(1, this.N);
    --this.N;
    this.sink(1);
    return max;
  }
  //使用上浮算法，使索引k处的元素能在堆中处于一个正确的位置
  swim(k) {
    while (k > 1) {
      if (this.less(k, parseInt(k / 2))) {
        break;
      }
      this.exchange(parseInt(k / 2), k);
      k = parseInt(k / 2);
    }
  }
  // 使用下沉算法，使索引k处的元素能在堆中处于一个正确的位置。
  sink(k) {
    while (2 * k <= this.N) {
      let index_child_max,
        index_child_right = 2 * k + 1,
        index_child_left = 2 * k;
      index_child_max = index_child_right <= this.N ? this.less(index_child_left, index_child_right) ? index_child_right : index_child_left : index_child_left;

      if (this.less(index_child_max, k)) {
        break;
      }
      this.exchange(k, index_child_max);
      k = index_child_max;
    }
  }
}

class MinPriorityQueue {
  N = 0;
  items = [];
  //获取堆中的元素的个数
  size() {
    return this.N;
  }
  //判断队列是否为空
  isEmpty() {
    return this.N == 0;
  }
  //判断堆中索引i是否小于索引j的值
  less(i, j) {
    return this.items[i] < this.items[j];
  }
  // 交换索引i和索引j处的值
  exchange(i, j) {
    let t = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = t;
  }
  //往堆中插入一个元素
  insert(ele) {
    this.items[++this.N] = ele;
    this.swim(this.N);
  }
  //删除堆中最小的元素
  delMin() {
    this.exchange(1, this.N);
    --this.N;
    this.sink(1);
    return this.items[this.N + 1]
  }
  //上浮算法，是索引k处的元素处于堆中正确的位置
  swim(k) {
    while (k > 1) {
      if (this.less(parseInt(k / 2), k)) {
        break;
      }
      this.exchange(parseInt(k / 2), k);
      k = parseInt(k / 2);
    }
  }
  //下沉算法，是索引k处的元素处于堆中正确的位置
  sink(k) {
    while (2 * k <= this.N) {
      let index_child_min,
        index_child_left = 2 * k,
        index_child_right = 2 * k + 1;
      index_child_min = index_child_right <= this.N ? this.less(index_child_left, index_child_right) ? index_child_left : index_child_right : index_child_left;
      if (this.less(k, index_child_min)) {
        break;
      }
      this.exchange(k, index_child_min);
      k = index_child_min;
    }
  }
}

//测试最大优先队列
/* let mpq = new MaxPriorityQueue();
mpq.insert(1);
mpq.insert(2);
mpq.insert(3);
mpq.insert(4);
mpq.insert(5);
mpq.insert(6);
mpq.insert(7);
mpq.insert(8);
mpq.insert(9);
mpq.insert(10);
console.log(mpq.items);
console.log("---------------------")
while(!mpq.isEmpty()){
  mpq.delMax();
  console.log(mpq.N,"---",mpq.items)
} */

//测试最小优先队列
let mpq2 = new MinPriorityQueue();
mpq2.insert(10);
mpq2.insert(9);
mpq2.insert(8);
mpq2.insert(7);
mpq2.insert(6);
mpq2.insert(5);
mpq2.insert(4);
mpq2.insert(3);
mpq2.insert(2);
mpq2.insert(1);
console.log(mpq2.items);
console.log("---------------------")
while (!mpq2.isEmpty()) {
   mpq2.delMin();
}
console.log(mpq2.items)