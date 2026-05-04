import {React,useContext,useState} from 'react'
import Navbar from './../components/Navbar';
import { changePassword } from '../services/userServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { LoginContext } from '../App';
import AdminNavbar from '../components/AdminNavbar';

function ChangePassword() {
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const navigate=useNavigate()  
    const {role}=useContext(LoginContext)
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
          if(role=="admin"){
            navigate('/admin')
          }else{
navigate("/profile")
          }
          
        }
        else{
         toast.error("password change failed") 
        }
    }
  return (
    <div>
      {role === "admin" && <AdminNavbar />}
      {role === "student" && <Navbar />}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card p-4 p-md-5 border-0 shadow">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "72px", height: "72px" }}>
                  <i className="fas fa-key text-primary" style={{ fontSize: "1.75rem" }}></i>
                </div>
                <h2 className="fw-bold text-gradient mb-1">Change Password</h2>
                <p className="text-muted small">Enter your new desired password below</p>
              </div>

              <div className="mb-3">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-lock text-muted"></i>
                  </span>
                  <input type="password" id="inputNewPassword" placeholder="Enter new password" class="form-control border-start-0 ps-3" onChange={e => setNewPassword(e.target.value)} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Confirm New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-check-double text-muted"></i>
                  </span>
                  <input type="password" id="inputConfirmPassword" placeholder="Re-enter password" class="form-control border-start-0 ps-3" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <button className="btn btn-primary py-2 fw-bold" onClick={resetPassword}>
                  Update Password
                </button>
                <button className="btn btn-outline-secondary py-2 fw-bold" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
