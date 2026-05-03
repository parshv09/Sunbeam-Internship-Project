import {React,useState} from 'react'
import Navbar from './../components/Navbar';
import { changePassword } from '../services/userServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function ChangePassword() {
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const navigate=useNavigate()
    const resetPassword=async ()=>{
        if(newPassword.length==0){
          toast.warn("password is required")
          return
        }
        if(confirmPassword.length==0){
          toast.warn("confirm password is required")
          return
        }   
        const token=sessionStorage.getItem('token')
        const result=await changePassword(token,newPassword,confirmPassword)
        if(result.status=="success"){
          toast.success("password changed successfully")
          navigate("/profile")
        }
        else{
         toast.error("password change failed") 
        }
    }
  return (
    <div>
      <Navbar/>
      <h1 className='text-center'>Change Password</h1>
              <div className='container'>
                <div className='mt-3 mb-3'>
                  
                </div>
                <div className='mb-3 '>
                      <input type="text" class="form-control" id="inputNewPassword" placeholder='Enter the new Password'  onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className='mb-3 '>
                      <input type="text" class="form-control" id="inputConfirmPassword" placeholder='Enter the confirm Password'  onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-dark" onClick={resetPassword}>Change Password</button>
                </div>
            </div>
    </div>
  )
}

export default ChangePassword
