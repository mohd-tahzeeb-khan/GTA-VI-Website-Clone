import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import "./App.css"
import 'remixicon/fonts/remixicon.css'
const App = () => {

  let [showContent, setshowContent] = useState(false)
  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%"
    })
      .to(".vi-mask-group", {
        scale: 10,
        delay: -1.8,
        duration: 2,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= .8) {
            document.querySelector(".svg").remove();
            setshowContent(true);
            console.log("ready to kill")
            this.kill();
            console.log("killed the process")
          }
        }
      })
  })
  useGSAP(() => {
    if(!showContent) return;

    gsap.to(".main",{
      scale:1,
      rotate:0,
      duration:2,
      delay:-1,
      ease:"Expo.easeInOut",
    });
    gsap.to(".sky", {
      scale:1.2,
      rotate:0,
      duration:1,
      delay:0,
      ease:"Expo.easeInOut",
    });
    gsap.to(".house", {
      scale:1.3,
      rotate:0,
      duration:1,
      delay:0,
      ease:"Expo.easeInOut"
    });
    gsap.to(".girlimag", {
      scale:.7,
      rotate:0,
      bottom:"-65%",
      right:-1,
      duration:1,
      delay:0,
      ease:"Expo.easeInOut"
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const Xmove = (e.clientX / window.innerWidth - .5) * 40;
      console.log(Xmove)

      gsap.to(".imagesdiv .text", {
        x: `${Xmove * .4}%`
      })
      gsap.to(".sky", {
        x: `${Xmove * .4}%`
      })
      gsap.to(".house", {
        x: `${-Xmove * .4}%`
      })

    })

  }, [showContent])
  return (
    <>
      <div className=' svg flex justify-center items-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black'>
        <svg className='svg-img' viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
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
      {
        showContent && (
          <div className='main w-full scale-150'>
            <div className='landing w-full h-screen bg-black'>
              <div className='navbar absolute top-0 left-0 w-full py-10 px-10 z-[999]'>
                <div className="logo flex flex-row gap-1">
                  <div className="lines flex flex-col gap-[5px]" >

                    <div className="line w-10 h-2 bg-white"></div>
                    <div className="line w-7 h-2 bg-white"></div>
                    <div className="line w-4 h-2 bg-white"></div>
                  </div>
                  <h3 className="rockstars text-2xl text-white -mt-[7px] leading-none">Rockstar</h3>
                </div>
              </div>
              <div className='imagesdiv w-full h-screen relative overflow-hidden'>
                <img className='sky absolute top-0 left-0 w-full h-full object-cover scale-200 rotate-90' src='./sky.png' />
                <img className='house absolute top-0 left-0 w-full h-full object-cover scale-0' src='./bg.png' />
                <div className="text absolute top-10 left-1/2 -translate-x-1/2  flex flex-col gap-5">
                  <h1 className='text-white text-9xl leading-none -ml-30'>grand</h1>
                  <h1 className='text-white text-9xl leading-none ml-5'>theft</h1>
                  <h1 className='text-white text-9xl leading-none -ml-30'>auto</h1>
                </div>
                <img className='girlimag absolute -bottom-[100%] scale-75' src='./girlbg.png' /> 
                {/* left-1/2 -translate-x-1/2 */}
              </div>
              <div className="btmbar absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-4 text-white text-2xl items-center">
                  <i className="ri-arrow-down-line"></i>
                  <h3 className="font-[Helvetica_Now_Display]">Scroll Down</h3>
                </div>
                <img className='h-[55px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' src='./ps5.png' alt='images' />
              </div>

            </div>
            <div className='w-full h-screen bg-black flex items-cente px-10'>
              <div className="cntr w-full h-[80%] flex text-white text-8xl" >
                <div className='limg relative w-1/2 h-full flex'>
                  <img className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-full scale-[1.3]' src="./imag.png" alt="" />
                </div>
                <div className="right w-1/2 ">
                  <h1>We’re Corrupt In A Good Way.</h1>
                  <p className='text-2xl font-[Halvetica_Now_Display] py-10'>Government man Dave Nortan admits to being corrupt in GTA 5 but says that he and his people are "corrupt in a good way." The idea of the Government being so corrupt that there are different levels of it is very funny, making this the most comical line that Dave says in the game.</p>
                  <button className='bg-yellow-400 text-black px-10 py-7 text-4xl'>David Nortons</button>
                </div>
              </div>




            </div>
          </div>
        )
      }
    </>
  )
}

export default App