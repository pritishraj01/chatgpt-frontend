import axios from 'axios'
import { use, useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()

function UserContext({ children }) {
  const serverUrl = import.meta.env.BACKEND_URL
  let navigate = useNavigate()
  let [userData, setUserData] = useState({})
  let [prompt, setPrompt] = useState("")
  let [response, setResponse] = useState("")
  let [display, setDisplay] = useState(false)
  let [recentPrompt, setRecentPrompt] = useState([])
  let [loading, setLoading] = useState(false)
  let [displayPrompt, setDisplayPrompt] = useState("")

  const getUserData = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/getuserdata", { withCredentials: true })
      setUserData(data)
    } catch (error) {
      navigate("/login")
      console.log({ mesage: error });
    }
  }

  const generate = async () => {
    try {
      setDisplayPrompt(prompt)
      setLoading(true)
      setDisplay(true)
      let { data } = await axios.post(serverUrl + "/api/aianswer", { prompt })
      setLoading(false)
      setRecentPrompt((prev)=>[...prev,prompt])
      const answer = data.text.split(/\*{1,2}/)
      console.log(answer)
      setResponse(answer)
    } catch (error) {
      console.error(error);
      setResponse("Error generating text");
    }
  }


  const value = {
    serverUrl,
    getUserData,
    userData,
    setUserData,
    generate,
    setPrompt,
    prompt,
    response,
    display,
    recentPrompt,
    setDisplay,
    loading,
    setLoading,
    displayPrompt,
    setDisplayPrompt
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <dataContext.Provider value={value}>
        {children}
      </dataContext.Provider>
    </div>
  )
}

export default UserContext
