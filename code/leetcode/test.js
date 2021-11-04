console.log('开始运行');
//---------------------------------------------------------
//回文链表
var isPalindrome = function (head) {
  // 通过快慢指针切割分半
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // fast 不为null 说明为奇数个，
  if (fast !== null) {
    slow = slow.next;
  }
  fast = head;
  let slowHead = revers(slow);
  while (slowHead != null) {
    if (fast.val !== slowHead.val) return false;
    fast = fast.next;
    slowHead = slowHead.next;
  }
  return true;
};

var revers = function (head) {
  let pre = null;
  while (head != null) {
    let tail = head.next;
    head.next = pre;
    pre = head;
    head = tail;
  }
  return pre;
};

let node = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 2,
      next: {
        val: 1,
        next: null,
      },
    },
  },
};
console.log(isPalindrome(node));
