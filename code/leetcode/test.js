console.log('开始运行');
//---------------------------------------------------------
var isValidBST = function (root) {
  return loopTree(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
};

let loopTree = function (root, min, max) {
  if (root === null) return true;
  console.log(root.val, min, max)
  if (root.val <= min || root.val >= max) return false
  return loopTree(root.left, min, root.val) && loopTree(root.right, root.val, max)
}
let node = {
  val: 2,
  left: {
    val: 1,
    right: null,
    left: null
  },
  right: {
    val: 3,
    right: null,
    left: null
  },
};

console.log(isValidBST(node))