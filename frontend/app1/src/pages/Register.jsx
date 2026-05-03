import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/userServices";
import { useNavigate, useParams } from "react-router";
import { getCourseDetails } from "../services/courseServices";
import { LoginContext } from "../context/LoginConext";
function Register() {
  const { courseId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
   const {loginStatus,setLoginStatus}=useContext(LoginContext)
  const navigate = useNavigate();
  const [courses,setCourses]=useState([])
  useEffect(()=>{getCourse()},[])

  const getCourse=async ()=>{
    const result=await getCourseDetails(courseId)
    if(result.status=="success"){
      console.log(result.data)
      setCourses(result.data[0])
    }
  }

  const signup = async (e) => {
    if (name.length == 0) {
      toast.warn("name is required", { theme: "colored" });
      return;
    }
    if (email.length == 0) {
      toast.warn("email is required");
      return;
    }
    if (phone.length == 0) {
      toast.warn("phone is required");
      return;
    }
    const result = await registerUser(courseId, name, email, phone);
    console.log(result);
    if (result.status == "success") {
      toast.success("registration successful");
      if(loginStatus){
        navigate('/course')
      }else{
         navigate("/login");
      }
     
    } else {
      toast.error("registration failed");
    }
  };
  return (
    <div >
     
      <h3 className="text-center my-3">{courses.course_name}</h3>
      <div className="d-flex justify-content-center mt-4 mb-2 ">
        <div className="card shadow-lg" style={{ width: "18rem" }}>
          
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> start date: {courses.start_date?.split("T")[0].split("-").reverse().join("-")}</li>
            <li className="list-group-item">Fees:  Rs. {courses.fees}</li>
          </ul>
        </div>
        <div className="card" style={{ width: "18rem" }}>
         
          <ul className="list-group list-group-flush">
            <li className="list-group-item">End date: {courses.end_date?.split("T")[0].split("-").reverse().join("-")}</li>
            <li className="list-group-item">Details: <br />{courses.description}</li>
          </ul>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center vh-100 my-1 pt-3 shadow">
        <div className="border p-4 rounded w-25 mx-auto shadow bg-white">
          <h3 className="text-center mb-4">Register to Course</h3>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="invalid-feedback">Please enter your name</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <div className="invalid-feedback">
              Please enter a valid mobile number.
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={signup}>
            Register
          </button>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <span className="me-2">Already have an account?</span>
            <a href="/">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
