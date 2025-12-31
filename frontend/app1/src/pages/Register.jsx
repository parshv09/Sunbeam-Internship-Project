import {useState} from 'react'
import { toast } from 'react-toastify';
import { registerUser } from '../services/userServices';
import { useNavigate } from 'react-router';
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate=useNavigate()
  const signup=async (e)=>{
    if(name.length==0){
      toast.warn("name is required",{ theme: "colored" })
      return
    }
    if(email.length==0){
      toast.warn("email is required")
      return
    }
    if(phone.length==0){
      toast.warn("phone is required")
      return
    }
    const result= await registerUser(name,email,phone)
    console.log(result)
    if(result.status=="success"){
      toast.success("registration successful")
      navigate("/")
    }
    else{
      toast.error("registration failed")
    }
  }
  return (
     <div className="d-flex align-items-center justify-content-center vh-100 my-5 pt-5">
      <div className="border p-4 rounded w-25 mx-auto shadow bg-white">

        <h3 className="text-center mb-4">Register to Course</h3>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={e=>{setName(e.target.value)}}
          />
          <div className="invalid-feedback">
            Please enter your name
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={e=>{setEmail(e.target.value)}}
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <div className="invalid-feedback">
            Password must be at least 6 characters long.
          </div>
        </div> */}

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            maxLength={10}
            placeholder="Enter Mobile Number"
            onChange={e=>{setPhone(e.target.value)}}
          />
          <div className="invalid-feedback">
            Please enter a valid mobile number.
          </div>
        </div>

        <button
        
          className="btn btn-primary w-100"
          onClick={signup}
        >
          Register
        </button>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <span className="me-2">Already have an account?</span>
          <a href="/">Login here</a>
        </div>

      </div>
    </div>

  )
}

export default Register
