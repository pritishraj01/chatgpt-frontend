import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { TfiPencilAlt } from "react-icons/tfi";
import { dataContext } from '../context/UserContext';

function Sidebar() {
    let [extend, setExtend] = useState(false)
    let { serverUrl, setUserData,recentPrompt, setDisplay,setPrompt } = useContext(dataContext)

    const handleLogOut = async () => {
        try {
            await axios.post(serverUrl + "/api/logout", {}, {
                withCredentials: true
            })
            setUserData(null)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen  bg-gray-950 text-gray-100 flex flex-col justify-start  box-border'>
            <div className={`${extend ? 'w-64 xs:w-[170px] ' : 'w-20 xs:w-[0px]'} transition-all duration-1000 bg-gray-950 border-b border-gray-800 flex flex-col overflow-hidden`}>
                <div className='h-10 w-10 rounded-[30px] flex justify-center items-center hover:cursor-pointer hover:bg-[#393939] transition-all duration-[0.1s] ease-in-out fixed top-1 left-1 z-50' onClick={() => { setExtend(!extend) }}>
                    <FaBars className='text-white text-2xl' />
                </div>
                <div className='flex relative justify-start items-center  rounded-[30px] h-10 mt-[70px] hover:bg-[#393939] hover:cursor-pointer transition-all duration-500 ml-2 mr-2 ease-in-out '>
                    <TfiPencilAlt className=' pl-3 text-4xl text-white ml-[8px]' />
                    {extend ? <p className='text-white font-mono absolute left-[40%]' onClick={()=>{setDisplay(false)}}>New Chat</p> : null}
                </div>

                {extend ? <div className='flex-1 flex flex-col gap-2 mt-4 overflow-y-auto scrollbar-none'>
                    <p className='text-white font-mono font-bold text-2xl'>Recent</p>
                    {recentPrompt.map((x,i)=>(
                        <p key={i} className='px-4 py-2 box-border font-sans font-medium w-full rounded-lg hover:bg-[#393939] cursor-pointer transition-all duration-100 text-white truncate' onClick={()=>{setPrompt(x) }}>{x}</p>
                    ))}
                    
                </div> : null}                
            </div>
            {extend?<button className='absolute bottom-20 left-5 h-[40px] w-[100px] p-[5px] box-border font-sans font-medium rounded-[30px]  hover:cursor-pointer hover:bg-[#ff0000] transition-all duration-500 ease-in-out text-white' onClick={handleLogOut}>Logout</button>:null}
        </div>
    )
}

export default Sidebar
