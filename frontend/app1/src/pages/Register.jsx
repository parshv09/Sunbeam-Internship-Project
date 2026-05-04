import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/userServices";
import { useNavigate, useParams } from "react-router";
import { getCourseDetails } from "../services/courseServices";
import { LoginContext } from "../App";
import "../assets/register.css"

function Register() {
  const { courseId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const {loginStatus,setLoginStatus,role}=useContext(LoginContext)
  const [lstate,setlstate]=useState(false)
  const navigate = useNavigate();
  const [courses,setCourses]=useState([])

  useEffect(()=>{
    getCourse()
    console.log(loginStatus)
    setlstate(loginStatus)
  },[])

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
      if(lstate){
        navigate('/course')
      }else{
         navigate("/login");
      }
    } else {
      toast.error("registration failed");
    }
  };

  return (
    <div className="course-detail-page py-4 min-vh-100 d-flex flex-column justify-content-center" style={{ background: "var(--bg-gradient)" }}>
      <div className="container px-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button 
            className="btn btn-outline-primary fw-bold px-3 py-2" 
            onClick={() => navigate(-1)}
            style={{ borderRadius: "10px" }}
          >
            <i className="fas fa-arrow-left me-2"></i> Back
          </button>
        </div>

        <div className="text-center mb-4">
          <h1 className="fw-bold text-gradient mb-2 fs-2">{courses.course_name}</h1>
          {role !== "admin" && <p className="text-muted lead fs-6">Complete your enrollment to get started immediately</p>}
        </div>

        <div className="row justify-content-center g-4 align-items-stretch">
          {/* Left Column: Course details */}
          <div className="col-md-6">
            <div className="card h-100 p-4 border-0 shadow bg-white bg-opacity-95" style={{ borderRadius: "16px" }}>
              <div className="card-body p-2 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}>
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <h4 className="mb-0 fw-bold text-dark">Course Schedule</h4>
                  </div>
                  
                  <div className="mb-3 d-flex align-items-center bg-light p-3 rounded-3">
                    <i className="far fa-calendar-check text-primary me-3 fs-4"></i>
                    <div>
                      <span className="text-muted small d-block">Start Date</span>
                      <span className="fw-bold text-dark fs-5">
                        {courses.start_date ? courses.start_date.split("T")[0].split("-").reverse().join("-") : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 d-flex align-items-center bg-light p-3 rounded-3">
                    <i className="far fa-calendar-times text-primary me-3 fs-4"></i>
                    <div>
                      <span className="text-muted small d-block">End Date</span>
                      <span className="fw-bold text-dark fs-5">
                        {courses.end_date ? courses.end_date.split("T")[0].split("-").reverse().join("-") : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}>
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <h4 className="mb-0 fw-bold text-dark">About Course</h4>
                  </div>
                  
                  <p className="text-dark mb-0 fs-6" style={{ lineHeight: "1.7" }}>
                    {courses.description}
                  </p>
                </div>

                <div className="border-top pt-3 mt-4 d-flex justify-content-between align-items-center">
                  <span className="text-muted fw-bold fs-5">Course Fees:</span>
                  <span className="fs-3 fw-bold text-gradient">Rs. {courses.fees}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Form */}
          {role !== "admin" ? (
            <div className="col-md-6">
              <div className="card h-100 p-4 border-0 shadow bg-white bg-opacity-95" style={{ borderRadius: "16px" }}>
                <div className="card-body p-2">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold mb-1 text-dark">Enroll in Course</h3>
                    <p className="text-muted small">Sign up to start your learning journey</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1 text-muted">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 py-2" style={{ borderRadius: "10px 0 0 10px" }}>
                        <i className="fas fa-user text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-2 py-2"
                        placeholder="Your Full Name"
                        style={{ borderRadius: "0 10px 10px 0" }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1 text-muted">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 py-2" style={{ borderRadius: "10px 0 0 10px" }}>
                        <i className="fas fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-2 py-2"
                        placeholder="name@example.com"
                        style={{ borderRadius: "0 10px 10px 0" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold mb-1 text-muted">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 py-2" style={{ borderRadius: "10px 0 0 10px" }}>
                        <i className="fas fa-phone text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-2 py-2"
                        maxLength={10}
                        placeholder="Your 10-digit Phone Number"
                        style={{ borderRadius: "0 10px 10px 0" }}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 py-3 fw-bold fs-6 mb-3" onClick={signup}>
                    <i className="fas fa-check-circle me-2"></i> Complete Registration
                  </button>

                  {!loginStatus && (
                    <div className="text-center pt-3 border-top">
                      <p className="text-muted mb-2 small">Already have an account?</p>
                      <button className="btn btn-outline-primary px-3 py-1" onClick={() => navigate("/login")}>
                        <i className="fas fa-arrow-right-to-bracket me-2"></i> Login Here
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              <div className="card h-100 p-4 border-0 shadow bg-white bg-opacity-95 d-flex flex-column justify-content-center align-items-center text-center" style={{ borderRadius: "16px" }}>
                <i className="fas fa-shield-alt text-muted mb-3 fs-1"></i>
                <h4 className="fw-bold text-dark">Admin Access Only</h4>
                <p className="text-muted lead mb-0 fs-6">Courses can only be enrolled by registered student profiles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
