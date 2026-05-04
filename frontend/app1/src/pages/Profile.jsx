import { use, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getUser } from '../services/userServices'
import Register from './Register';
import { useNavigate } from 'react-router';
import { LoginContext } from '../App';
import AdminNavbar from '../components/AdminNavbar';
function Profile() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [mobile ,setMobile]=useState("")
  const navigate=useNavigate()
  const {role}=useContext(LoginContext)
useEffect(()=>{
  console.log("profile loaded")
  getUserProfile()
},[])
  const getUserProfile=async ()=>{
    const token=sessionStorage.getItem('token')
    const result=await getUser(token)
    console.log(result)
    if(result.status=="success"){
      setName(result.data.name)
      setEmail(result.data.email)
      setMobile(result.data.mobile_number)
    }
  }
  const resetPassword=(e)=>{
    
    navigate("/change-password")
  }
  return (
    <div>
      {role === "admin" && <AdminNavbar />}
      {role === "student" && <Navbar />}
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 p-md-5 border-0 shadow">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "80px", height: "80px" }}>
                  <i className="fas fa-id-card text-primary" style={{ fontSize: "2rem" }}></i>
                </div>
                <h2 className="fw-bold text-gradient mb-1">Your Profile</h2>
                <p className="text-muted small">Manage your account information and preferences</p>
              </div>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-user text-muted"></i>
                  </span>
                  <input type="text" className="form-control border-start-0 ps-3" id="inputName" value={name} onChange={e => setName(e.target.value)} disabled />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-envelope text-muted"></i>
                  </span>
                  <input type="text" className="form-control border-start-0 ps-3" id="inputEmail" value={email} onChange={e => setEmail(e.target.value)} disabled />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-phone text-muted"></i>
                  </span>
                  <input type="tel" className="form-control border-start-0 ps-3" id="inputMobile" value={mobile} onChange={e => setMobile(e.target.value)} disabled />
                </div>
              </div>

              <div className="text-center pt-3 border-top d-flex justify-content-between gap-2">
                <button className="btn btn-outline-primary flex-grow-1" onClick={resetPassword}>
                  <i className="fas fa-lock me-2"></i> Change Password
                </button>
                <button className="btn btn-dark flex-grow-1" onClick={() => navigate(-1)}>
                  <i className="fas fa-arrow-left me-2"></i> Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
