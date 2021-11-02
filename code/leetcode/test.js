console.log('start');
//---------------------------------------------------------
// 反转链表
var reverseList = function(head) {
  if(head === null) return null;
  let pre = head;
  let node = reverseList(head.next);
  
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
console.log((reverseList(node)))