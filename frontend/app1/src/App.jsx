
import Home from './pages/Home';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import { Navigate, Route,Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import { createContext, useEffect, useState } from 'react';
import ChangePassword from './pages/ChangePassword';
import { LoginContext } from './context/LoginConext';
import Admin from './pages/Admin';


function App() {
  const [loginStatus,setLoginStatus]=useState(() => {
  const savedStatus = sessionStorage.getItem("loginStatus")
  return savedStatus === "true" ? true : false

})
  const [role,setRole]=useState("")
  useEffect(() => {
  sessionStorage.setItem("loginStatus", loginStatus)
}, [loginStatus])
  return (
      <>
      <LoginContext.Provider value={{loginStatus,setLoginStatus,role,setRole}}>
        <Routes>
          <Route path='/*' element={<LandingPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register/:courseId' element={ <Register />}/>
          <Route path='/home' element={loginStatus && role=="student" ? <Home /> : <Navigate to="/" />}/>
          <Route path='/profile' element={loginStatus  && role=="student" ? <Profile /> : <Navigate to="/" />}/>
          <Route path='/Courses' element={loginStatus  && role=="student" ? <Courses /> : <Navigate to="/" />}/>
          <Route path='/change-password' element={loginStatus  && role=="student" ? <ChangePassword /> : <Navigate to="/" />}/>
          <Route path='/admin' element={loginStatus && role=="admin" ? <Admin /> : <Navigate to="/" />}/>
        </Routes>

        </LoginContext.Provider>
         {/* <h1>hello from react</h1>
          <Home></Home>
          <Profile></Profile>
          <Courses></Courses> */}
          <ToastContainer theme='colored'/> 
      </>
  )
}

export default App
