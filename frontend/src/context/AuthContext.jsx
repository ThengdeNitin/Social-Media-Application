import axios from 'axios'
import cookie from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const AuthContextProvider = ({ children}) => {

  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(!!cookie.get("token"))
  const [user, setUser] = useState('')
  
  useEffect(() => {
    if(token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get("token")}`
    }
  }, [])

  const fetchCurrentUserDetails = async () => {
    try {
      const token = cookie.get("token")
      const { data } = await axios.get(`${backendUrl}/api/user/me`, {
        header: {
          Authorization: 'Bearern ${token}'
        }
      })
      if(data.success){
        setUser(data.currentUser)
      }
    } catch (error) {
      console.log(error)
      toast.error("Register failed")
    }
  }

  useEffect(() => {
    if(token){
      fetchCurrentUserDetails()   
    }
  }, [])

  const handleRegister = async(username, email, password, avatar) => {
    try {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("image", avatar)

      const { data } = await axios.post(`${backendUrl}/api/user/register`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })

      if(data.success){
        cookie.set("token", data.token, { expires: 7 })
        setToken(true)
        setUser(data.user)
        toast.success(data.message || "Login successfull")
        navigate('/posts')
      }

    } catch (error) {
      console.log(error)
      toast.error("Register failed")
    }
  }

  const handleLogin = async(email, password) => {
    try {

      const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password}, {
        headers: {
          "Content-type": "application/json"
        }
      })

      if(data.success){
        cookie.set("token", data.token, { expires: 7 })
        setToken(true)
        setUser(data.user)
        toast.success(data.message || "Login successfull")
        navigate('/posts')
      }

    } catch (error) {
      console.log(error)
      toast.error("Login failed")
    }
  }

  const handleLogout = async(email, password) => {
    cookie.remove("token")
    setToken(false)
    setUser(null)
    toast.success("Logout Successfully")
  }
   
  const values = {
    backendUrl,
    token,
    setToken,
    user, setUser,
    handleRegister,
    handleLogin,
    handleLogout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider