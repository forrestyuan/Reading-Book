# Vue.extend 与 Vue.component区别
## vue.extend
vue.extend使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。  
vue.extend相当于一个扩展实例构造器，用于创建一个具有初始化选项的Vue子类，在实例化时可以进行扩展选项，最后使用$mount方法绑定在元素上。
