/*

*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function(l1, l2) {
  var auxList = null;
  var p1 = l1, p2 = l2, p3;
  if(l1 != null || l2 !== null){
      auxList = new ListNode();
      p3 = auxList;
  }   
  while(p1!= null && p2!= null){
      if(p1.val < p2.val){
          p3.val = p1.val;
          p1 = p1.next;
      }else{
          p3.val = p2.val;
          p2 = p2.next;
      }
      p3.next = new ListNode();
      p3 = p3.next;
      
  }
  while(p1!=null){
      p3.val = p1.val;
      p1 = p1.next;
      if(p1!= null){
          p3.next = new ListNode();
          p3 = p3.next;
      }
  }
  while(p2!=null){
      p3.val = p2.val;
      p2 = p2.next;
      if(p2!= null){
          p3.next = new ListNode();
          p3 = p3.next;
      }
      
  }
  return auxList;
};



var mergeTwoLists = function(l1, l2) {
  var auxList = new ListNode()
  var p3 = auxList;
  while(l1!= null && l2!= null){
      if(l1.val < l2.val){
          p3.next = l1;
          l1 = l1.next;
      }else{
          p3.next = l2;
          l2 = l2.next;
      }
      p3 = p3.next;
  }
  if(l1!=null) p3.next = l1;
  if(l2!=null) p3.next = l2;
  return auxList.next;
};