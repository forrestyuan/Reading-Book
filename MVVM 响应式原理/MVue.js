//指令工具集合，处理不同的指令
const compileUtil = {
  getVal(expr, vm){
    return expr.split('.').reduce((data, currentValue)=>{
      return data[currentValue];
    }, vm.$data)
  },
  setVal(expr, vm, inputVal){
    var props = expr.split(".");
    var data = vm.$data;
    props.forEach((val, index, arr) =>{
      if(index == arr.length- 1){
        data[arr[index]] = inputVal;
      }else{
        data = data[arr[index]];
      }
    })
  },
/*   getContentVal(expr,vm){
    return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
      return this.getVal(args[1],vm)
    })
  }, */
  text(node, expr, vm){ //expr:msg
    console.log("------CompileUtil.text---------")
    let value;
    console.log("expr:",expr);
    if(expr.indexOf("{{") !== -1 ){ //{{person.name}}-{{person.age}}
      var regxTime = 1;
      //通过replace第二参数为函数，可以针对每一个匹配到的内容做操作。
      value =  expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
        console.log("regxTimes:"+(regxTime++)+"---args:",args);
        //绑定观察着，将来数据发生变化，触发这里的回调。
        new Watcher(vm, args[1], () =>{
          this.updater.textUpdater(node, this.getVal(args[1],vm));
        })
        return this.getVal(args[1],vm)
      })
    }else{
      console.log("CompileUtil.text(),这里由V-text逻辑")
      new Watcher(vm, expr, (newVal) =>{
        this.updater.textUpdater(node, newVal);
      })
      value = this.getVal(expr, vm)
    }
    // const value = this.getVal(expr, vm);
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm){
    const value = this.getVal(expr, vm);
    new Watcher(vm, expr, newVal => {
      this.updater.htmlUpdater(node, newVal);
    })
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm){
    const value = this.getVal(expr, vm);
    //数据=>视图
    new Watcher(vm, expr, (newVal)=>{
      this.updater.modelUpdater(node, newVal);
    })
    //视图=>数据=>视图
    node.addEventListener('input',(e)=>{
      //设置值
      this.setVal(expr,vm,e.target.value);
    })
    this.updater.modelUpdater(node, value);
  },
  on(node, expr, vm, eventName){
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  bind(node, expr, vm, attrName){
    node.setAttribute(attrName, vm.$data[expr]);
  },
  //更新的函数
  updater:{
    textUpdater(node, value){
      node.textContent =  value;
    },
    htmlUpdater(node, value){
      node.innerHTML = value;
    },
    modelUpdater(node, value){
      node.value = value;
    }
  }
}
class Compile{
  constructor(el, vm){
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //1. 获取文档碎片对象，放入内存中会减少页面中的回流和重绘
    const fragment = this.node2Fragment(this.el);
    // console.log(fragment);
    //2. 编译模板
    this.compile(fragment);
    //3. 追加子元素到根元素
    this.el.appendChild(fragment)
  }
  compile(fragment){
    //获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child=>{
      if(this.isElementNode(child)){
        //是元素节点
        //编译元素节点
        // console.log("元素节点"+child)
        this.compileElement(child);
      }else{
        //是文本节点
        //编译文本节点
        this.compileText(child);
      }

      if(child.childNodes && child.childNodes.length){
        this.compile(child);
      }
    })
  }
  compileElement(node){
    const attributes = node.attributes;
    // console.log(attributes);
    [...attributes].forEach(attr=>{
      const {name, value} = attr;
      if(this.isDirective(name)){//是一个指令 v-text v-html v-model v-on:click
        const [,directive] = name.split('-');// text html model on:click
        const[dirName, eventName] = directive.split(':'); //text html model on
        //更新数据 数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName);
        // 删除有指令的标签上的属性
        node.removeAttribute('v-'+directive);
      }else if(this.isEventName(name)){// @click = "handleclick"
        let [,eventName] = name.split("@");
        compileUtil.on(node, value, this.vm, eventName);
        node.removeAttribute(name);
      }else if(this.isBindName(name)){ // v-bind 的缩写 :src="asdfasdf"
        let [,bindName] = name.split(":");
        compileUtil.bind(node, value, this.vm, bindName);
        node.removeAttribute(name);
      }

    })

  }
  isBindName(attrName){
    return attrName.startsWith(":");
  }
  isEventName(attrName){
    return attrName.startsWith("@");
  }
  compileText(node){
    const content = node.textContent;
    if(/\{\{(.+?)\}\}/.test(content)){
      console.log("compileText 方法",content)
      compileUtil.text(node, content,this.vm)
    }
  }
  isDirective(attrName){
    return attrName.startsWith('v-');
  }
  node2Fragment(el){
    //创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;

    while(firstChild = el.firstChild){
      f.appendChild(firstChild);
    }
    return f;
  }
  isElementNode(node){
    return node.nodeType == 1;
  }
}
class MVue{
  constructor(options){
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if(this.$el){
      //1.实现一个数据观察者Observer
      new Observer(this.$data);
      //2.实现要给指令解析器
      new Compile(this.$el, this);

      this.proxyData(this.$data)
    }
  }
  proxyData(data){
    var keys = Object.keys(data);
    keys.forEach((val,index)=>{
      Object.defineProperty(this, val, {
        get(){
          return data[key];
        },
        set(newVal){
          data[key] = newVal;
        }
      })
    })
  }
}