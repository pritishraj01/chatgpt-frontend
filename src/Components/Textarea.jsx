import React, { useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../context/UserContext'
import { IoSendOutline } from "react-icons/io5";
import ai from "../assets/ai.webp"
import gsap from 'gsap'

function Textarea() {
  const body=useRef(null)

  useEffect(() => {
  if (body.current) {
    gsap.from(body.current, {
      opacity: 0,  
      x:-1000,
      duration: 2, 
      stagger:1 
    });
  }
}, []);

  let { userData, setPrompt, prompt, display, generate, response, loading, displayPrompt } = useContext(dataContext)
  let name = userData?.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'User';
  return (
    <div ref={body} className='xs-hidden h-screen w-full bg-gradient-to-t  from-gray-950 to-gray-900 flex flex-col'>
      {display ? <div className='flex-1 p-10 box-border flex flex-col justify-start text-white overflow-scroll scrollbar-none relative'>
        <p className='text-white font-sans mb-7 flex'><span className='text-[30px] font-mono font-semibold text-red-500'><div className='mr-5 overflow-hidden bg-white rounded-full right-5 top-5 h-10 w-10 sm:h-7 sm:w-7 md:h-8 md:w-8'><img src={userData.profileImg} className="h-full w-full object-cover flex justify-center items-center" alt="profile img " /></div></span> : {displayPrompt}</p>
        <p className="text-white font-sans mb-4 flex items-start break-words whitespace-pre-wrap flex-1 overflow-scroll scrollbar-none"><span className='text-[30px] font-mono font-semibold text-red-500 mr-0 flex'><div className='mr-5 overflow-hidden bg-white rounded-full right-5 top-5 h-10 w-10 sm:h-7 sm:w-7 md:h-8 md:w-8'><img src={ai} className="h-full w-full object-cover flex justify-center items-center" alt="profile img " /></div></span>: {loading ? <div className="flex w-full flex-col items-center justify-center to-gray-900">
          <div className="flex">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce200"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce400"></div>
          </div>
          <p className="mt-4 text-gray-700 text-lg">Loading, please wait...</p>
        </div> : response}</p>
      </div> : <div className='h-full  flex flex-col justify-center items-center'>
        <p className='text-[#2d2df0] font-sans font-semibold   sm:text-[35px] xs:text-[30px]'>Hello {name}</p>
        <p className='text-[#a9a9a9] font-sans font-semibold  sm:text-[35px] xs:text-[20px] mt-2'>How can I help you today?</p>
      </div>}
      <div className='h-[20vh] bg-[#fffdfd00] backdrop-blur-[10px] w-full flex justify-center items-center'>
        <div className='shadow-lg shadow-[#ffffff32] h-[70%] xs:h-[40%] xs:w-[80%] w-[60%] border-[1px] rounded-[50px] flex justify-between p-10 box-border text-xl items-center'>
          <input type="text" placeholder='Ask Your Question' className='overflow-scroll bg-[#ff000000] w-[85%] rounded-lg p-[10px] box-border border-none outline-none text-white' onChange={(e) => setPrompt(e.target.value)} value={prompt} />
          <button className='text-white text-2xl p-[10px] box-border rounded-[50%] hover:bg-[#25282a]' onClick={generate}><IoSendOutline /></button>
        </div>
      </div>
    </div>
  )
}

export default Textarea
