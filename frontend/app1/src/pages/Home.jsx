import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getActiveCourses } from '../services/courseServices'
import { useNavigate } from 'react-router'
import { LoginContext } from '../context/LoginConext'
import java from "../assets/java.png"
import mern from "../assets/mern.jpeg"
const images=[]
let imageIndex=0
function Home() {
  const {loginStatus,setLoginStatus,role}=useContext(LoginContext)
  const [courses,setCourses]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    console.log(loginStatus)
    console.log(role)
    getCourses()
  images.push(java);images.push(mern)},[])

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
   
    <div >
       <Navbar />

      <div className="container py-5">
        {/* Header with improved styling */}
        <div className="text-center mb-5">
          <h2 className="section-title mb-3">
            Available <span className="text-gradient">Courses</span>
          </h2>
          <p className="section-subtitle text-muted">
            Choose from our curated collection of courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="row g-4">
          {courses.map((course) => {
            const courseImage = images[imageIndex % images.length];
            imageIndex++;
            
            return (
              <div key={course.course_id} className="col-md-6 col-lg-4">
                <div className="course-card">
                  {/* Image Container */}
                  <div className="course-image-container">
                    <img 
                      src={courseImage} 
                      alt={course.course_name}
                      className="course-image"
                    />
                    <div className="course-overlay"></div>
                  </div>

                  {/* Course Content */}
                  <div className="course-content">
                    <h5 className="course-name">{course.course_name}</h5>
                    
                    {/* Course Info */}
                    <div className="course-info">
                      <div className="info-item">
                        <i className="far fa-calendar-alt me-2"></i>
                        <span className="text-muted">Starts: </span>
                        <span className="fw-medium">{formatDate(course.start_date)}</span>
                      </div>
                    </div>

                    {/* Price and Button */}
                    <div className="course-footer">
                      <div className="course-price">
                        <h4 className="price-text">Rs. {course.fees || 'Free'}</h4>
                      </div>
                      <button
                        className="enroll-button"
                        onClick={() => navigate(`/register/${course.course_id}`)}
                      >
                        <i className="fas fa-arrow-right me-2"></i>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-5">
          <a
            href="/course/all-active-courses"
            className="view-all-btn"
          >
            View All Courses
            <i className="fas fa-arrow-right ms-2"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
