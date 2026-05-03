import { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getUser } from '../services/userServices'
import Register from './Register';
import { useNavigate } from 'react-router';
function Profile() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [mobile ,setMobile]=useState("")
  const navigate=useNavigate()
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
      <Navbar/>
        <div className='container'>
                <div className='mt-3 mb-3'>
                    <input type="text" className="form-control" id="inputEmail" value={email}  onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='mb-3 d-flex '>
                    <input type="text" className="form-control me-3" id="inputName" value={name}  onChange={e => setName(e.target.value)}/>
                    <input type="tel" className="form-control ms-3" id="inputMobile" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>  

                <div>
                  <label>Do you want to change your password? </label><label>... </label>
                    <button className="btn btn-success btn-sm" onClick={resetPassword}>Change Password</button>
                </div>
            </div>
    </div>
  )
}

export default Profile
