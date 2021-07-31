import {useState} from 'react'
function useAnimation(baseClsName, activeClsName) {
  let [className,setClassName] = useState(baseClsName)
  const toggle = () => {
    if(className === baseClsName){
      setClassName(`${baseClsName} ${activeClsName}`)
    } else {
      setClassName(`${baseClsName}`)
    }
  }
  return [className, toggle]
}

export default useAnimation