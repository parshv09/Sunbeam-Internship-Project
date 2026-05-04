import React, { useEffect, useState } from "react";
import "../App.css";
import "../assets/course.css";
import "../assets/landing.css";
import { Link, useNavigate } from "react-router";
import { getActiveCourses } from "../services/courseServices";
import img from "../helper/images"
let imageIndex=0
const LandingPage = () => {
  const [courses,setCourses]=useState([])
  const [images,setImages]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{getCourses();setImages(img)},[])

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
    <div className="student-portal" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <style>{`
        .hover-scale {
          transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm py-3" style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)" }}>
        <div className="container">
          <span className="navbar-brand logo-text mb-0 h1">
            <i className="fas fa-book-open me-2 text-primary"></i> LMS
          </span>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto d-flex justify-content-center align-items-center">
              <li className="nav-item">
                <Link className="nav-link px-3" to="/">
                  <i className="fas fa-home me-2 text-primary"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#courses">
                  <i className="fas fa-graduation-cap me-2 text-primary"></i> Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#how">
                  <i className="fas fa-question-circle me-2 text-primary"></i> How to Enroll
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <Link className="btn btn-primary px-4 fw-bold" to="/login">
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 fw-bold" style={{ borderRadius: "20px" }}>
                  <i className="fas fa-bolt me-1"></i> Unlock your potential
                </span>
                <h1 className="display-4 fw-bold mb-3" style={{ color: "var(--dark)", letterSpacing: "-0.04em", lineHeight: "1.15" }}>
                  Learn. Grow. <br />
                  <span className="text-gradient">Succeed.</span>
                </h1>
                <p className="lead text-muted mb-4" style={{ fontSize: "1.15rem" }}>
                  Access premium courses from industry experts and build the skills needed for tomorrow's careers. Start your learning journey today with our interactive platform.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <a href="#courses" className="btn btn-primary btn-lg px-4 fw-bold">
                    <i className="fas fa-graduation-cap me-2"></i> Browse Courses
                  </a>
                  <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 fw-bold">
                    Sign In <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card p-4 p-md-5 border-0 shadow-sm bg-white bg-opacity-90 hover-scale" style={{ borderRadius: "16px" }}>
                <h4 className="fw-bold mb-3 text-dark">Why Choose Our Platform</h4>
                <p className="text-muted mb-4">Empowering students through high quality video lessons, immediate material access, and uninterrupted performance.</p>
                
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "48px", height: "48px" }}>
                        <i className="fas fa-graduation-cap fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">Active Courses</h6>
                        <span className="text-muted small">Modern courses for practical skills</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "48px", height: "48px" }}>
                        <i className="fas fa-video fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">Curriculum Delivery</h6>
                        <span className="text-muted small">High-quality video lectures with complete progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses py-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-gradient mb-2">Available Courses</h2>
            <p className="text-muted lead">Choose from our curated collection of courses</p>
          </div>

          <div className="row g-4 justify-content-center">
            {courses.map((course) => {
              const courseImage = images[imageIndex % images.length];
              imageIndex++;

              return (
                <div key={course.course_id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 border-0 shadow-sm p-3 d-flex flex-column justify-content-between">
                    <div className="mb-3">
                      <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "8px" }}>
                        <img 
                          src={courseImage} 
                          alt={course.course_name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    </div>

                    <div className="flex-grow-1 mb-3">
                      <h5 className="fw-bold text-dark mb-2">{course.course_name}</h5>
                      <div className="small text-muted mb-2">
                        <i className="far fa-calendar-alt me-2 text-primary"></i>
                        Starts: <span className="fw-semibold">{formatDate(course.start_date)}</span>
                      </div>
                      {course.description && (
                        <p className="text-muted small text-truncate-2">
                          {course.description}
                        </p>
                      )}
                    </div>

                    <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <span className="small text-muted d-block">Fees</span>
                        <span className="fw-bold text-primary fs-5">Rs. {course.fees || 'Free'}</span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm px-3 fw-bold"
                        onClick={() => navigate(`/register/${course.course_id}`)}
                      >
                        Enroll <i className="fas fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Enroll */}
      <section id="how" className="enroll-steps py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2 text-gradient">How to Enroll</h2>
            <p className="text-muted lead">Simple steps to start learning</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100 border-0 shadow">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle mx-auto" style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>
                  <i className="fas fa-user-plus text-primary"></i>
                </div>
                <h4 className="fw-bold mb-2 text-dark">1. Create Account</h4>
                <p className="text-muted small">
                  Register with your email and create your student profile
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100 border-0 shadow">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle mx-auto" style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>
                  <i className="fas fa-book text-primary"></i>
                </div>
                <h4 className="fw-bold mb-2 text-dark">2. Choose Course</h4>
                <p className="text-muted small">
                  Browse available courses and select the one you want to learn
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100 border-0 shadow">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle mx-auto" style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>
                  <i className="fas fa-play-circle text-primary"></i>
                </div>
                <h4 className="fw-bold mb-2 text-dark">3. Start Learning</h4>
                <p className="text-muted small">
                  Access course videos and materials immediately after enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="benefits py-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4 text-gradient">Why Choose Our Platform</h2>
              <div className="d-flex mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0" style={{ width: "56px", height: "56px", fontSize: "1.25rem" }}>
                  <i className="fas fa-video text-primary"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "var(--dark)" }}>Video Lessons</h5>
                  <p className="text-muted mb-0">High-quality video lectures with lifetime access to materials.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0" style={{ width: "56px", height: "56px", fontSize: "1.25rem" }}>
                  <i className="fas fa-certificate text-primary"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "var(--dark)" }}>Certificates</h5>
                  <p className="text-muted mb-0">Get recognized and certified upon complete course evaluation.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0" style={{ width: "56px", height: "56px", fontSize: "1.25rem" }}>
                  <i className="fas fa-laptop text-primary"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "var(--dark)" }}>Learn Anywhere</h5>
                  <p className="text-muted mb-0">Access courses from any device, anytime with completely uninterrupted flow.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card p-4 p-md-5 text-center border-0 shadow">
                <h4 className="fw-bold mb-2">Ready to Start?</h4>
                <p className="text-muted mb-4">Advance your education and expand your career with industry-tailored courses.</p>
                <Link to="/login" className="btn btn-primary btn-lg w-100 fw-bold py-3">
                  Begin Your Journey <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5 bg-dark text-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 text-white">
                <i className="fas fa-book-open me-2 text-primary"></i> LMS
              </h5>
              <p className="text-white-50" style={{ fontSize: "0.95rem" }}>
                A platform dedicated to student learning and growth through high quality online courses and materials.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-3 text-white">Navigation</h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <Link to="/login" className="text-white-50 text-decoration-none hover-link">Login</Link>
                </li>
                <li className="mb-2">
                  <a href="#courses" className="text-white-50 text-decoration-none hover-link">All Courses</a>
                </li>
                <li className="mb-2">
                  <a href="#how" className="text-white-50 text-decoration-none hover-link">Enrolling</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-3 text-white">Need Help?</h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  <span className="text-white-50" style={{ fontSize: "0.95rem" }}>support@studyportal.com</span>
                </li>
                <li>
                  <i className="fas fa-phone me-2 text-primary"></i>
                  <span className="text-white-50" style={{ fontSize: "0.95rem" }}>+91 98765 43210</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-bold mb-3 text-white">Connect</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-white-50 fs-5"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <hr className="my-4" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
          <div className="text-center">
            <p className="mb-0 text-white-50" style={{ fontSize: "0.85rem" }}>
              &copy; 2026 Study Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
