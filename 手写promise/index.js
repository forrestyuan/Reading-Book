const p = new Promise((resolve, reject) => { // 执行器函数
  setTimeout(() => {
    const time = Date.now()
    if(time % 2 === 0) {
      resolve('成功的数据，time='+ time)
    }else{
      reject('失败的数据,time='+ time)
    }
  }, 1000);
})

p.then(value =>{
  console.log('value')
}, err =>{
  console.log(err)
})

/**
 * 手写promise
 */