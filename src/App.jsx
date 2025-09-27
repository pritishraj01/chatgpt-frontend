import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { dataContext } from './context/UserContext'

function App() {
  let {userData}= useContext(dataContext)
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={userData?<Home/>:<Signup/>}/>
      <Route path='*' element={<Home/>}/>
    </Routes>
  )
}

export default App
