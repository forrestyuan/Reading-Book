
/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

// 方法一：使用pop和push但是只维护一个栈
var CQueue = function() {
    this.stack_from = [];
    this.stack_to = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack_from.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    var res = -1
    var fromLen = this.stack_from.length;
    for(var i = 0; i < 2 * fromLen - 1; i++){
        if(i == fromLen-1){
            res =  this.stack_from.pop(); // 出队列
        }else if(i < fromLen - 1){
            this.stack_to.push(this.stack_from.pop()); //从from复制到to
        }else{
            this.stack_from.push(this.stack_to.pop()); // 从to复制到from
        }
    }
    return res;
};

//方法二： 不用库函数，只维护一个栈
var CQueue = function() {
    this.stack_from = [];
    this.stack_to = [];
    this.fromLen = -1;
    this.toLen = -1;
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack_from[++this.fromLen] = value;
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  for(var i = this.fromLen; i >= 1; i--){
      this.stack_to[++this.toLen] = this.stack_from[i];
      this.stack_from[i] == void 0;
  }
  var res = this.stack_from[0] || -1;
  this.stack_from[0] = void 0;
  this.fromLen = -1;
  for(var j = this.toLen; j >=0; j--){
    this.stack_from[++this.fromLen] = this.stack_to[j];
  }
  this.toLen = -1;
  return res;
};

// 方法三，维护两个栈
var CQueue = function() {
  this.stack_from = [];
  this.stack_to = [];
};

/** 
* @param {number} value
* @return {void}
*/
CQueue.prototype.appendTail = function(value) {
  this.stack_from.push(value);
};

/**
* @return {number}
*/
CQueue.prototype.deleteHead = function() {
  if(this.stack_from == 0 && this.stack_to.length == 0) return -1;
  if(this.stack_to.length != 0){
    return this.stack_to.pop();
  }
  while(this.stack_from.length != 0){
    this.stack_to.push(this.stack_from.pop())
  }
  return this.stack_to.pop();
};