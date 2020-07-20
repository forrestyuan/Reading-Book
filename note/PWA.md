 三个特点：  
  快速，可靠，粘性

PWA不是一个单独的技术  
* Web App Manifest
* Service Worker
* Push API & Notification API
* App Shell && APP Skeleton
* .....等等

PWA需要在HTTPS协议下。  

1. 如何是网站可以添加到桌面

Web App Manifest技术来支撑。是一个简单的json文件，
```json
{
  name:"初心日志",
  short_name:"初心",
  display:"standalone",
  start_url:"/?from=homescreen",
  icons:["..."],
  background_color:"#fff",
  theme_color:"#eee"

}
```
```html
<link rel="manifest" href="/assets/mainfest.json">
```

调试Web App Manifest:
* 在Chrome的开发者工具中查看：application-> Manifest

2. service worker
最多缓存24小时。

sw-register-demo.js
```js
//注册serviceworker
// 不能跨域
if("serviceWroker" in navigator){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register('/static/sw-demo.js',{scope:"/static/"}).then(function(registration){
      console.log(registration.scope);
    }).catch(fucntion(error){
      console.log(error)
    });
  })
}
```
sw-demo.js

```js
this.addEvenetListener('install', function(event){
  evnet.waitUntil(
    caches.open('my-cache-v1').then(function(cache){
      cache.addAll([
        '/','/test.js','/test.css'
      ])
    })
  );
});

this.addEventListener('activate', funciton(event){
  event.waitUntil(
    Promise.all([
      this.client.claim(),
      caches.keys().then(function(cacheList){
        return Promise.all(
          cacehList.map(function(cacehName){
            if(cacheName){
              return caches.delete(cacheName)
            }
          });
        );
      });
    ]);
  )

})

```