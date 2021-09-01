IntersectionObserver 接口 (从属于 Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100%;
        height: 300px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 45px;
        background-color: antiquewhite;
      }
    </style>
  </head>
  <body>
    <div class="box">1234567890-</div>
    <div class="box">1234567890-4</div>
    <div class="box">1234567890-45</div>
    <div class="box">1234567890-456</div>
    <div class="box">1234567890-4567</div>
    <div class="box">1234567890-45678</div>
    <div class="box">1234567890-456789</div>
    <div class="box">1234567890-4567890</div>
    <script>
      var intersectionObserver = new IntersectionObserver(function (entries) {
        // If intersectionRatio is 0, the target is out of view
        // and we do not need to do anything.

        if (entries[0].intersectionRatio <= 0) return;
        //在这里干一些事情
        // loadItems(10);
        console.log(entries[0].target);
        console.log("Loaded new items");
      });
      // start observing
      document
        .querySelectorAll(".box")
        .forEach((node) => intersectionObserver.observe(node));
    </script>
  </body>
</html>
```
