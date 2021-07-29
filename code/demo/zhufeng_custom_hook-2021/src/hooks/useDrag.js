import { useState,useRef, useLayoutEffect } from 'react';
function useDrag(){
  //dom元素的位置
  const positionRef = useRef({
    currentX:0,
    currentY:0,
    lastX:0,
    lastY:0
  })
  const [, forceUpdate] = useState({})
  useLayoutEffect(()=>{
    //拖拽开始的x，y坐标
    let startX, startY;
    const start = function(event){
      const {clientX, clientY} = event.targetTouches[0]
      startX = clientX
      startY = clientY
      domRef.current.addEventListener('touchmove', move)
      domRef.current.addEventListener('touchend', end)
    }
    const move = function (event){
      const {clientX, clientY} = event.targetTouches[0]
      positionRef.current.currentX = positionRef.current.lastX + (clientX - startX)
      positionRef.current.currentY = positionRef.current.lastY + (clientY - startY)
      forceUpdate({})
    }
    const end = function(event){
      positionRef.current.lastX = positionRef.current.currentY
      positionRef.current.lastY = positionRef.current.currentY
      domRef.current.removeEventListener('touchmove',move)
      domRef.current.removeEventListener('touchend',end)
    }
    domRef.current.addEventListener('touchstart',start)
  },[])
  //让哪个dom元素进行移动
  const domRef = useRef(null)
  return [{x:positionRef.current.currentX, y:positionRef.current.currentY}, domRef]
}

export default useDrag