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
     {console.log(courses)}
        <div className="container py-5">
       <div className="text-center mb-5">
          <h2 className="section-title mb-3">
            My Enrolled <span className="text-gradient">Courses</span>
          </h2>
        </div>
          <div className="row g-4">
            {courses.map((course) =>{ console.log("FINAL COURSE OBJECT:", course)
            return (
             
              <div key={course.course_id} className="col-md-6 col-lg-4">
                <div className="course-card card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="course-name">{course.course_name}</h5>
                    <p className="text-secondary mb-4">{course.description}</p>

                    <div className="course-info mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          <i className="far fa-clock me-1"></i>{" "}
                          {"start date: " + course.start_date.split("T")[0].split("-").reverse().join("-")}
                        </span>
                      </div>
                    </div>
                    
                      <button
                        className="enroll-button"
                        onClick={() => navigate(`/videos/${course.course_id}`)}
                      >
                        <i className="fas fa-arrow-right me-2"></i>
                          Start Learning
                      </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
  
    </div>
  );
}
export default Courses;
