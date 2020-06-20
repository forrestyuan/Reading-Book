/**
 * 二叉树相关
 */
class Node {
  constructor(val = void 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  //1. 添加节点
  insert(val) {
    this.root = this._insert(this.root, val);
  }
  _insert(node, val) {
    if (node == null) {
      return new Node(val);
    }
    if (val > node.val) {
      node.right = this._insert(node.right, val);
    } else if (val < node.val) {
      node.left = this._insert(node.left, val);
    } else {
      node.val = val;
    }
    return node;
  }
  //2. 查询节点
  search(val){
    return this._search(this.root, val);
  }
  _search(node, val){
    if(node == null){
      return false;
    }
    if(val > node.val){
      return this._search(node.right, val);
    }else if(val < node.val){
      return this._search(node.left, val);
    }else{
      return node;
    }
  }
  //3. 删除节点
  delete(val){
    this.root = this._delete(this.root, val);
  }
  _delete(node, val){
    if(node == null){
      return node;
    }
    if(val > node.val){
      node.right = this._delete(node.right, val);
    }else if(val < node.val){
      node.left = this._delete(node.left, val);
    }else{
      //删除操作
      if(node.left == null) return node.right;
      if(node.right == null) return node.left;
      let minNode = node.right;
      while(minNode.left != null){
        minNode = minNode.left;
      }
      node.val = minNode.val; // copy more fileds if needed
      node.right = this._delete(node.right, minNode.val);
    }
    return node;
  }
  //4. 更新节点
  update(preVal, newVal){
    this.delete(preVal);
    this.insert(newVal);
  }

  //5. 遍历二叉树
  //前序遍历
  preOrder(node){
    let res = [];
    this._preOrder(node, res);
    return res;
  }
  _preOrder(node, res){
    if(node == null){
      return;
    }
    res.push(node.val);
    this._preOrder(node.left, res);
    this._preOrder(node.right, res);
  }
  //中序遍历
  inOrder(node){
    let res = [];
    this._inOrder(node, res);
    return res;
  }
  _inOrder(node, res){
    if(node == null){
      return;
    }
    this._inOrder(node.left, res);
    res.push(node.val);
    this._inOrder(node.right, res);
  }
  //后序遍历
  lastOrder(node){
    let res = [];
    this._inOrder(node, res);
    return res;
  }
  _lastOrder(node, res){
    if(node == null){
      return;
    }
    this._lastOrder(node.left, res);
    this._lastOrder(node.right, res);
    res.push(node.val);
  }
}


//测试
let btree = new BinaryTree();
let nodes = [50,40,60,38,42,58,62];
nodes.forEach(val => btree.insert(val));

console.log("整棵树结构")
console.log(btree.root);
console.log("前中后序遍历");
console.log(btree.preOrder(btree.root).toString());
console.log(btree.inOrder(btree.root).toString());
console.log(btree.lastOrder(btree.root).toString());
console.log("查询62,42,420结果：");
console.log(btree.search(62));
console.log(btree.search(42));
console.log(btree.search(420));
console.log("删除节点");
btree.delete(40);
btree.delete(58);
console.log(btree.preOrder(btree.root).toString());
console.log("更新节点");
btree.update(38,30);
btree.update(62,63);
console.log(btree.preOrder(btree.root).toString());

