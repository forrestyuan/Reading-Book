const p = new Promise((resolve, reject) => { // 执行器函数
  setTimeout(() => {
    const time = Date.now()
    if (time % 2 === 0) {
      resolve('成功的数据，time=' + time)
    } else {
      reject('失败的数据,time=' + time)
    }
  }, 1000);
})

p.then(value => {
  console.log('value')
}, err => {
  console.log(err)
})

/**
 * 手写promise
 */

function MyPromise(excutor) {
  let self = this;
  self.status = 'pending' //状态
  self.value = null // 成功之后，返回的数据
  self.reason = null //失败原因
  //返回成功的结果
  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fufilled'
    }
  }
  // 返回失败的原因
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected '
    }
  }
  try {
    excutor(resovle, reject)
  } catch (err) {
    reject()
  }

}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) {
    resolve(data)
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
    throw err
  }

}

