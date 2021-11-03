console.log('开始运行');
//---------------------------------------------------------
//回文链表
var isPalindrome = function(head) {

};


let node = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}
console.log(isPalindrome(node))
var reverseList = function(head) {
  if(head === null || head.next === null) return head;
  let node = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return node;
};


let node2 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}
console.log(JSON.stringify(reverseList(node2)))