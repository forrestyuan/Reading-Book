/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 删除链表的倒数第N个节点
var removeNthFromEnd = function (head, n) {
  if (head.next === null) return null;
  let count = 2;
  let preCount = -1;
  let pre = null;
  let tail = head.next;

  while (true) {
    if (tail.next === null) {
      if (preCount + 1 === (count - n)) {
        if (pre === null) {
          pre = head;
          let tmp = pre.next;
          pre.val = tmp.val
          pre.next = pre.next.next === null ? null : pre.next.next;
        } else if (pre.next.next === null) {
          pre.next = null
        } else {
          pre.next = pre.next.next;
        }
        break;
      } else {
        pre = pre === null ? head : pre.next;
        ++preCount;
      }
    } else {
      ++count;
      tail = tail.next;
    }
  }
  return head;
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
console.log(JSON.stringify(removeNthFromEnd(node, 3)))