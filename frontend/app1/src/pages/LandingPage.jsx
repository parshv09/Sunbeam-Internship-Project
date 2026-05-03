import React, { useEffect, useState } from "react";
import "../App.css";
import "../assets/course.css";
import "../assets/landing.css";
import { Link, useNavigate } from "react-router";
import { getActiveCourses } from "../services/courseServices";
import java from "../assets/java.png"
import mern from "../assets/mern.jpeg"
const images=[]
let imageIndex=0
const LandingPage = () => {
  const [courses,setCourses]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{getCourses(); images.push(java);images.push(mern)},[])

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
    <div className="student-portal">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary fs-4" href="#">
            <i className="fas fa-book-open me-2"></i>Study Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto d-flex justify-content-center align-items-center">
              <li className="nav-item mx-3">
                <a className="nav-link text-dark fw-medium" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link text-dark fw-medium" href="#courses">
                  Courses
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link text-dark fw-medium" href="#how">
                  How to Enroll
                </a>
              </li>
            </ul>
            <div className="d-flex justify-content-end">
              <Link className="btn btn-primary px-4 py-2 fw-medium" to="/login">
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
        <section id="home" className="hero">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 hero-content">
                    <h1 className="hero-title">
                        Learn. Grow. <span>Succeed.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Access premium courses from industry experts and build the skills needed for tomorrow's careers. Start your learning journey today with our interactive platform.
                    </p>
                    <div className="hero-buttons">
                        <a href="#courses" className="btn btn-primary-custom" style={{color:"white"}}>
                            <i className="fas fa-graduation-cap me-2"></i> Browse Courses
                        </a>
                        
                    </div>
                    
                   
                    {/* <div className="mt-5">
                        <p className="text-muted small mb-2">Trusted by leading companies</p>
                        <div className="d-flex flex-wrap gap-4">
                            <div className="trust-item">
                                <i className="fas fa-check-circle text-success me-1"></i>
                                <span className="small">Expert instructors</span>
                            </div>
                            <div className="trust-item">
                                <i className="fas fa-check-circle text-success me-1"></i>
                                <span className="small">Certificate upon completion</span>
                            </div>
                            <div className="trust-item">
                                <i className="fas fa-check-circle text-success me-1"></i>
                                <span className="small">Flexible learning schedule</span>
                            </div>
                        </div>
                    </div> */}
                </div>
                
                <div className="col-lg-6 hero-visual mt-5 mt-lg-0">
                    <div className="hero-stats-container">
                        <div className="row">
                            <div className="col-4">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="fas fa-book-open"></i>
                                    </div>
                                    <div className="stat-value">80+</div>
                                    <div className="stat-label">Courses</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="fas fa-users"></i>
                                    </div>
                                    <div className="stat-value">2.5K+</div>
                                    <div className="stat-label">Students</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <div className="stat-value">98%</div>
                                    <div className="stat-label">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="row mt-4 pt-3 border-top">
                            <div className="col-6">
                                <div className="stat-item">
                                    <div className="stat-icon" style={{background: "linear-gradient(135deg, rgba(247, 37, 133, 0.1), rgba(181, 23, 158, 0.1)); color: var(--accent-color)"}}>
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <div className="stat-value" style={{background: "var(--gradient-accent); -webkit-background-clip: text; background-clip: text"}}>40+</div>
                                    <div className="stat-label">Instructors</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="stat-item">
                                    <div className="stat-icon" style={{background: "linear-gradient(135deg, rgba(45, 206, 137, 0.1), rgba(0, 168, 107, 0.1)); color: #2dce89"}}>
                                        <i className="fas fa-award"></i>
                                    </div>
                                    <div className="stat-value" style={{background: "linear-gradient(135deg, #2dce89 0%, #00a86b 100%); -webkit-background-clip: text; background-clip: text"}}>500+</div>
                                    <div className="stat-label">Certificates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                 
                    <div className="floating-element floating-element-1">
                        <i className="fas fa-play-circle"></i>
                        <h6>Video Lessons</h6>
                        <p>High-quality instructional videos</p>
                    </div>
                    
                    <div className="floating-element floating-element-2">
                        <i className="fas fa-tasks"></i>
                        <h6>Practice Exercises</h6>
                        <p>Hands-on learning</p>
                    </div>
                    
                    <div className="floating-element floating-element-3">
                        <i className="fas fa-certificate"></i>
                        <h6>Certification</h6>
                        <p>Industry-recognized</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* Courses Section */}
     <section id="courses" className="courses py-5">
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
    </section>

      {/* How to Enroll */}
      <section id="how" className="enroll-steps py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">How to Enroll</h2>
            <p className="text-muted">Simple steps to start learning</p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-user-plus text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Create Account</h5>
                <p className="text-muted">
                  Register with your email and create your student profile
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-book text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Choose Course</h5>
                <p className="text-muted">
                  Browse available courses and select the one you want to learn
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-play-circle text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Start Learning</h5>
                <p className="text-muted">
                  Access course videos and materials immediately after
                  enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="benefits py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2 className="fw-bold mb-4">Why Choose Our Platform</h2>
              <div className="benefit-item d-flex mb-3">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-video text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Video Lessons</h5>
                  <p className="text-muted mb-0">
                    High-quality video lectures with lifetime access
                  </p>
                </div>
              </div>
              <div className="benefit-item d-flex mb-3">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-certificate text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Certificates</h5>
                  <p className="text-muted mb-0">
                    Get certified upon course completion
                  </p>
                </div>
              </div>
              <div className="benefit-item d-flex">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-laptop text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Learn Anywhere</h5>
                  <p className="text-muted mb-0">
                    Access courses from any device, anytime
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="p-4 bg-white rounded-3 shadow-sm">
                  <h5 className="fw-bold mb-3">Ready to Start?</h5>
                  <p className="text-muted mb-4">
                    Join thousands of students who are already learning with us
                  </p>
                  <a href="/login" className="btn btn-primary btn-lg w-100">
                    Begin Your Journey
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-4">
                <i className="fas fa-book-open me-2"></i>Study Portal
              </h5>
              <p className="text-light">
                A platform dedicated to student learning and growth through
                quality online courses.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-4">For Students</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/login" className="text-light text-decoration-none">
                    Login
                  </Link>
                </li>
                <li className="mb-2">
                  <a
                    href="/course/all-active-courses"
                    className="text-light text-decoration-none"
                  >
                    All Courses
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/student/my-courses"
                    className="text-light text-decoration-none"
                  >
                    My Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/student/change-password"
                    className="text-light text-decoration-none"
                  >
                    Account
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-4">Need Help?</h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  <span className="text-light">help@studyportal.com</span>
                </li>
                <li>
                  <i className="fas fa-phone me-2 text-primary"></i>
                  <span className="text-light">+91 98765 43210</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-bold mb-4">Connect</h6>
              <div className="social-links">
                <a href="#" className="text-light me-3">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-light me-3">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-light me-3">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-light" />
          <div className="text-center">
            <p className="mb-0 text-light">
              &copy; 2025 Study Portal. For student learning only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
