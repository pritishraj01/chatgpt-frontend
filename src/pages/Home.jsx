import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../Components/Sidebar'
import Textarea from '../Components/Textarea'



function Home() {
    let { userData } = useContext(dataContext)
    let navigate = useNavigate()
    if (!userData) {
        navigate("/signup")
    }

    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Textarea />
        </div>
    )
}

export default Home
