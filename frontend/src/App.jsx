import { ToastContainer } from 'react-toastify'
import {useContext} from 'react'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Navigate, Route, Routes} from 'react-router-dom'
import { PostsPage } from './pages/PostsPage';
import { AddPost } from './components/AddPost';
import { Landing } from './pages/Landing'
import { Register } from './pages/Register'
import {ForgotPassword} from './pages/ForgotPassword'


function App() {

  const { token } = useContext(AuthContext)

  return (
    <div className='h-screen'>
      <ToastContainer/>
      {token ? (
        <>
        <Navbar/>
        <Routes>
          <Route path ='/posts' element = {<PostsPage/>}/>
          <Route path = '/' element = {<Navigate to= "/posts"/>}/>
          <Route path='/create-post' element={<AddPost/>}/>
        </Routes>
        </>
      ) : (
        <Routes>
          <Route path ='/' element = {<Landing/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/forgot-password' element = {<ForgotPassword/>}/>
        </Routes>
      )}
    </div>
  )
}

export default App
