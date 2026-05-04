import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getRegisteredCourses } from "../services/courseServices";
import { Link, useNavigate } from "react-router";
function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate= useNavigate()
  useEffect(() => {
    getMyCourse();
    
  }, []);
  const getMyCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getRegisteredCourses(token);
    console.log(result.data);
    if (result.status == "success") {
      setCourses(result.data);
      console.log("COURSE OBJECT:", courses);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-gradient mb-2">My Enrolled Courses</h1>
          <p className="text-muted lead">Track and continue your learning progress</p>
        </div>
        <div className="row g-4 justify-content-center">
          {courses.map((course) => {
            return (
              <div key={course.course_id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 border-0 shadow p-4 d-flex flex-column justify-content-between" style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", borderRadius: "var(--radius)" }}>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: "48px", height: "48px", fontSize: "1.25rem" }}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{course.course_name}</h5>
                    <p className="text-muted small text-truncate-3 mb-3">{course.description}</p>

                    <div className="border-top pt-3 d-flex align-items-center">
                      <i className="far fa-calendar-alt text-primary me-2"></i>
                      <span className="text-muted small">
                        Start Date: <span className="fw-semibold text-dark">{course.start_date?.split("T")[0].split("-").reverse().join("-")}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-2 py-2 fw-bold"
                    onClick={() => navigate(`/videos/${course.course_id}`)}
                  >
                    Start Learning <i className="fas fa-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            );
          })}

          {courses.length === 0 && (
            <div className="text-center py-5">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: "64px", height: "64px", fontSize: "1.75rem" }}>
                <i className="fas fa-book-open"></i>
              </div>
              <h3>No Enrolled Courses Found</h3>
              <p className="text-muted">Explore and enroll in the available courses to start learning.</p>
              <button className="btn btn-primary mt-3 px-4" onClick={() => navigate("/home")}>
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Courses;
