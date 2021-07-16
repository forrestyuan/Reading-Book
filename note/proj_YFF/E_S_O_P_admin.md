## 四舍五入及浮点数精度问题
```js
1443 * 0.015 //21.645
(1443 * 0.015).toFixed(2) // 21.64 (期望正确值为 21.65)
  
4461 * 0.015 // 66.91499999999999
(4461 * 0.015).toFixed(2) // 66.91 (期望正确值为 66.92)
```
大陆和香港金融机构，计算利息尾数用的规则都是 四舍五入
ECMAScript 规范 follow IEEE 754，IEEE 754 建议的默认 rounding 算法是 Bankers Rounding，也就是所谓的 四舍六入五成双
这种情况下，如例1中的 21.645.toFixed(2) ，我们期望的是 21.65 （金融机构的四舍五入规则），但是实际会得到 21.64，差一分钱
另外一个情况是图上的例2中的问题，因为 js 浮点数精度导致 0.005 显示为 0.00499999 被舍弃
需要查一下负责的代码，如果有在 乘除之后再调用 toFixed 展示的地方，可能需要修改

可以考虑使用如下版本的替代 toFixed
```js
function toFixedN (v, n) {
  let left = (v * Math.pow(10, n)) % 1,
    biggerInt = Math.floor(v * Math.pow(10, n))
  if (Math.abs(left - 0.5) < 1e-8) {
    left = 0.5
  }
  if (left >= 0.5) {
    biggerInt += 1
  }
  return (biggerInt / 100).toFixed(2)
}
  
  
toFixedN(1443 * 0.015, 2) // 21.65
toFixedN(4461 * 0.015, 2) // 66.92
```