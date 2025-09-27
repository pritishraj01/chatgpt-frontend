import React, { useContext, useRef, useState } from 'react'
import dp from "../assets/dp.jpg"
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context/UserContext';
import axios from "axios"


function Signup() {
  let { serverUrl , setUserData,getUserData} = useContext(dataContext)
  let navigate = useNavigate()

  let [email, setEmail] = useState("")
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")
  let file = useRef("")
  let [frontendImg, setFrontendImg] = useState(dp)
  let [backendImg, setBackendImg] = useState("")


  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImg(file)
    let image = URL.createObjectURL(file)
    setFrontendImg(image)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      let formdata = new FormData()
      formdata.append("name", name)
      formdata.append("email", email)
      formdata.append("password", password)

      if (backendImg) {
        formdata.append("profileImg", backendImg)
      }
      let { data } = await axios.post(serverUrl + "/api/signup", formdata, { withCredentials: true, headers: { "content-type": "multipart/form-data" } })
      console.log(data)
      await getUserData()
      setUserData(data)
      navigate("/home")

    } catch (error) {
      console.log("error:", error)
    }
  }

  return (
    <div className='h-[100vh] w-full bg-[#000000] flex justify-center items-center'>
      <div className='h-[90%] w-[90%] max-w-[500px]  rounded-[10px] flex flex-col justify-center items-center gap-[30px] p-[20px] z-10 bg-[#0000007b]'>
        <h1 className='text-[40px] font-bold text-[white]'>Signup</h1>
        <div className='h-[150px] w-[150px] flex justify-center items-center relative'>
          <img src={frontendImg} className='w-[100%] h-[100%] rounded-[50%] overflow-hidden box-border' />
          <div className='absolute w-[100%] h-[100%] rounded-[50%] bg-white flex justify-center items-center opacity-0 hover:opacity-50 text-[30px] transition-all duration-[0.3s] ease-in-out hover:cursor-pointer' onClick={() => file.current.click()}>
            +
          </div>
          <input type="file" hidden ref={file} onChange={(e) => { handleImage(e) }} />
        </div>

        <form className=' h-[100%] flex flex-col items-center w-[100%] gap-[20px]' onSubmit={handleSignup}>
          <input type="text" placeholder='Name' className='w-[100%] h-[40px] rounded-[5px] p-[5px] box-border border-none outline-none font-semibold' onChange={(e) => setName(e.target.value)} value={name} />
          <input type="email" placeholder='Email' className='w-[100%] h-[40px] rounded-[5px] p-[5px] box-border border-none outline-none font-semibold' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" placeholder='Password' className='w-[100%] h-[40px] rounded-[5px] p-[5px] box-border border-none outline-none font-semibold' onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className='bg-[white] h-[40px] w-[100px] rounded-lg text-black font-bold text-[20px] p-[5px] box-border mt-[40px] hover:bg-[#00000000] hover:border-[1px] hover-gray hover:text-white transition-all duration-[0.2s] ease-in-out'>Signup</button>
          <p className='text-white font-mono hover:cursor-pointer hover:scale-[1.1] transition-all duration-[0.2s] ease-in-out' onClick={() => navigate("/login")}>Already have account? <span className='text-red-500'>Login</span></p>
        </form>
      </div>
      <Spline scene="https://prod.spline.design/n656ndVvbCSGdnum/scene.splinecode" className='absolute' />
    </div>
  )
}

export default Signup
