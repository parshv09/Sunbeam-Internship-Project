
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

import Admin from './pages/admin/Admin';
import Videos from './pages/Videos';
import GetAllVideos from './pages/admin/GetAllVideos';
import AdminCourses from './pages/admin/AdminCourses';
import AddCourse from './pages/admin/AddCourse';
import EditCourse from './pages/admin/EditCourse';
import AddNewVideo from './pages/admin/AddNewVideo';
import EditVideo from './pages/admin/EditVideo';
import AdminStudents from './pages/admin/AdminStudents';
// import AddNewVideo from './pages/admin/AddNewVideo';

export const LoginContext = createContext(null)
function App() {
     
      const [loginStatus,setLoginStatus]=useState(() => {
      const savedStatus = sessionStorage.getItem("loginStatus")
      return savedStatus === "true" ? true : false

    })
      const [role,setRole]=useState(()=>{
        return sessionStorage.getItem("role") || ""
      })
      useEffect(() => {
        sessionStorage.setItem("loginStatus", loginStatus)
      }, [loginStatus])
      
      useEffect(() => {
      if (role) {
        sessionStorage.setItem("role", role)
      }
    }, [role])

  return (
      <>
      <LoginContext.Provider value={{loginStatus,setLoginStatus,role,setRole}}>
        <Routes>
          <Route path='/*' element={<LandingPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register/:courseId' element={ <Register />}/>
          <Route path='/home' element={loginStatus && role=="student" ? <Home /> : <Navigate to="/" />}/>
          <Route path='/profile' element={loginStatus  && role=="student" || role=="admin" ? <Profile /> : <Navigate to="/" />}/>
          <Route path='/Courses' element={loginStatus  && role=="student" ? <Courses /> : <Navigate to="/" />}/>
          <Route path='/videos/:courseId' element={loginStatus  && role=="student" ? <Videos /> : <Navigate to="/" />}/>
          <Route path='/change-password' element={loginStatus  && role=="student" || role=="admin" ? <ChangePassword /> : <Navigate to="/" />}/>
          <Route path='/admin' element={loginStatus && role=="admin" ? <Admin /> : <Navigate to="/" />}/>
          <Route path='/get-all-videos' element={loginStatus && role=="admin" ? <GetAllVideos /> : <Navigate to="/" />}/>
          <Route path='/get-admin-courses' element={loginStatus && role=="admin" ? <AdminCourses /> : <Navigate to="/" />}/>
          <Route path='/add-courses' element={loginStatus && role=="admin" ? <AddCourse /> : <Navigate to="/" />}/>
          <Route path='/update-courses/:id' element={loginStatus && role=="admin" ? <EditCourse /> : <Navigate to="/" />}/>
          <Route path='/add-new-video' element={loginStatus && role=="admin" ? <AddNewVideo /> : <Navigate to="/" />}/>
          <Route path='/edit-video/:videoId' element={loginStatus && role=="admin" ? <EditVideo /> : <Navigate to="/" />}/>
          <Route path='/getStudents' element={loginStatus && role=="admin" ? <AdminStudents /> : <Navigate to="/" />}/>
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
