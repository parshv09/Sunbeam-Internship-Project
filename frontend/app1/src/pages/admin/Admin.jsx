import { useContext, useEffect, useState } from 'react'
import { getActiveCourses } from '../../services/courseServices'
import { useNavigate } from 'react-router'
import { LoginContext } from "../../App";
import img from "../../helper/images"
import AdminNavbar from '../../components/AdminNavbar';

let imageIndex=0

function Admin() {
  const {loginStatus,setLoginStatus,role}=useContext(LoginContext)
  const [images,setImages]=useState([])
  const [courses,setCourses]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    console.log(loginStatus)
    console.log(role)
    getCourses()
  setImages(img)},[])

  const getCourses=async ()=>{
    const result=await getActiveCourses()
    if(result.status=="success"){
      console.log(result.data)
      setCourses(result.data)
    }
  }
  const formatDate = (dateString) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };
  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5">
        {/* Header with improved styling */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-gradient mb-2">Available Courses</h1>
          <p className="text-muted lead">Admin management and course creation tools</p>
        </div>

        {/* Courses Grid */}
        <div className="row g-4 justify-content-center">
          {courses.map((course) => {
            const courseImage = images[imageIndex % images.length];
            imageIndex++;
            
            return (
              <div key={course.course_id} className="col-md-6 col-lg-4 mb-3">
                <div className="card border-0 shadow-sm p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "8px" }} className="mb-3">
                      <img 
                        src={courseImage} 
                        alt={course.course_name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <h5 className="fw-bold text-dark mb-2">{course.course_name}</h5>
                    
                    <div className="small text-muted mb-3">
                      <i className="far fa-calendar-alt me-2 text-primary"></i>
                      Starts: <span className="fw-semibold">{formatDate(course.start_date)}</span>
                    </div>
                  </div>

                  <div className="border-top pt-3 text-center">
                    <button
                      className="btn btn-primary w-100 fw-bold"
                      onClick={() => navigate(`/register/${course.course_id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
