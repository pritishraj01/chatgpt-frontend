import React, { useContext, useState } from 'react'
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context/UserContext';
import axios from 'axios';

function Login() {
  let navigate = useNavigate()
  let { serverUrl,getUserData,setUserData} = useContext(dataContext)

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let {data} = await axios.post(serverUrl + "/api/login", {
        email,
        password
      }, { withCredentials: true })
      console.log(data)
      await(getUserData)
      setUserData(data)
      navigate("/home")
    } catch (error) {
      console.log("error:",error)
    }
  }

  return (
    <div className='h-[100vh] w-full bg-[#000000] flex justify-center items-center'>
      <div className='h-[70%] w-[90%] max-w-[500px]  rounded-[10px] flex flex-col justify-between items-center gap-[30px] p-[20px] z-10 bg-[#0000007b]'>
        <h1 className='text-[40px] font-bold text-[white]'>Login</h1>
        <form className=' h-[100%] flex flex-col items-center w-[100%] gap-[20px]' onSubmit={handleLogin}>
          <input type="email" placeholder='Email' className='w-[100%] h-[40px] rounded-[5px] p-[5px] box-border border-none outline-none font-semibold' onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <input type="password" placeholder='Password' className='w-[100%] h-[40px] rounded-[5px] p-[5px] box-border border-none outline-none font-semibold' onChange={(e)=>setPassword(e.target.value)} value={password}/>
          <button className='bg-[white] h-[40px] w-[100px] rounded-lg text-black font-bold text-[20px] p-[5px] box-border mt-[40px] hover:bg-[#00000000] hover:border-[1px] hover-gray hover:text-white transition-all duration-[0.2s] ease-in-out'>Login</button>
          <p className='text-white font-mono hover:cursor-pointer hover:scale-[1.1] transition-all duration-[0.2s] ease-in-out ' onClick={() => navigate("/signup")}>Not have account? <span className='text-red-500'>Signup</span></p>
        </form>
      </div>
      <Spline scene="https://prod.spline.design/n656ndVvbCSGdnum/scene.splinecode" className='absolute' />
    </div>
  )
}

export default Login
