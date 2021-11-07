/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root === null) return true;
  if (root.left === null && root.right === null) return true;
  if (root.left === null && root.right !== null || root.left !== null && root.right === null) return false;
  return loopTree(root.left, root.right)
};

let loopTree = function (left, right) {
  if (left === null && right === null) return true;
  if (left === null || right === null || left.val !== right.val) return false;
  return loopTree(left.left, right.right) && loopTree(left.right, right.left)
}


// 迭代解法：
var isSymmetric = function (root) {
  if (!root) return;
  let q = [[root.left, root.right]];

  while (q.length) {
    let [left, right] = q.shift();
    if (!left && !right) continue;
    if (!left || !right || left.val != right.val) return false;
    q.push([left.left, right.right]);
    q.push([left.right, right.left]);
  }
  return true;
};