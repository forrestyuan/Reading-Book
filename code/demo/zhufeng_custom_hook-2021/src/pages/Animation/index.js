import React from 'react';
import useAnimation from '../../hooks/useAnimation'
import './index.css'

export default function Animation(){
  const [className, toggle] = useAnimation('circle', 'active')
  return (
    <div className={className} onClick={toggle}></div>
  )
}