import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import "./App.css"

const App = () => {

  let [showContent, setshowContent] = useState(false)
  useGSAP(()=>{
    const timeline=gsap.timeline();
    timeline.to(".vi-mask-group", {
      rotate:10,
      duration:2,
      ease:"Power4.easeInOut",
      transformOrigin:"50% 50%"
    })
    .to(".vi-mask-group", {
      scale:10, 
      delay:-1.8,
      duration:2,
      ease:"Expo.easeInOut",
      transformOrigin:"50% 50%",
      opacity:0,
      onUpdate:function(){
        if(this.progress() >=.8){
          document.querySelector(".svg").remove();
          setshowContent(true);
          console.log("ready to kill")
          this.kill();
          console.log("killed the process")
        }
      }
    })
  })
  return (
    <>
    <div className=' svg flex justify-center items-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black'>
      <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
        <defs>
          <mask id='viMask'>
            <rect width="100%" height="100%" fill='black' />
            <g className='vi-mask-group'>
              <text x="50%"
              y="50%"
              fontSize="250"
              textAnchor='middle'
              fill='white'
              dominantBaseline="middle"
              fontFamily='Arial Black'>
                VI
              </text>
            </g>
          </mask>
        </defs>
        <image href='./bg.png'
        width="100%"
        height="100%"
        preserveAspectRatio='xMidYMid'
        mask='url(#viMask)' />
      </svg>
    </div>
    </>
  )
}

export default App