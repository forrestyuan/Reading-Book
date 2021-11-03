/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if(head === null) return null;
  let pre = head;
  let node = reverseList(head.next);
  if(node !== null) {
    let tmp = node
    while(tmp.next !== null){
      tmp = tmp.next      
    }
    tmp.next = pre;
    tmp.next.next = null;
    return node;
  }
  return pre;
};

//优化的递归
var reverseList = function(head) {
  if(head === null || head.next === null) return head;
  let node = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return node;
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
console.log(JSON.stringify(reverseList(node)))