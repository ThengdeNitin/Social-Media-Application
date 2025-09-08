import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import PostsContextProvider from "./context/PostsContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthContextProvider>
        <PostsContextProvider>
          <App />
        </PostsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
)
