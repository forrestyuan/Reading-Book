class Watcher{
  constructor(vm, expr, cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //先把旧值保存起来
    this.oldVal = this.getOldVal();

  }
  getOldVal(){
    //将watcher挂载到Dep上。
    Dep.target = this;
    const oldVal = compileUtil.getVal(this.expr,this.vm);
    console.log("getOldVal")
    Dep.target = null;
    return oldVal;
  }
  update(){
    console.log("notify后更新视图")
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if(newVal !== this.oldVal){
      this.cb(newVal);
    }
  }
}



class Dep{
  constructor(){
    this.subs = [];
  }
  //收集观察者
  addSub(watcher){
    this.subs.push(watcher);
  }
  //通知观察者去更新
  notify(){
    console.log("观察者",this.subs)
    this.subs.forEach(w=>w.update())
  }
}




class Observer{
  constructor(data){
    this.observer(data)
  }

  observer(data){
    
    if(data && typeof data == 'object'){
      Object.keys(data).forEach(key => {
        this.defineReactive(data,key,data[key]);
      })
    }
  }

  defineReactive(obj,key,value){
    //递归遍历
    this.observer(value);
    const dep = new Dep();
    // 劫持并监听所有的属性
    Object.defineProperty(obj,key,{
      enumerable: true,
      configurable: false,
      get(){
        //初始化，发生在编译之前
        //订阅数据变化时，往Dep中添加观察着
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      //这里用箭头函数主要是为了使用其所在上下文的this
      set:(newVal)=>{
        this.observer(newVal)
        if(newVal != value){
          value = newVal;
        }
        //通知观察着去更新
        dep.notify();
      }
    })
  }
}