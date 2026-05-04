import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminNavbar from "../../components/AdminNavbar";
import { getAllCourses,getAllStudent } from "../../services/adminCourseServices";
// If your adminCourseServices needs dates, we’ll pass wide range

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const loadCourses = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const startDate = "2000-01-01";
      const endDate = "2100-12-31";

      const result = await getAllCourses(token, startDate, endDate);

      if (result.status === "success") {
        // expected: [{course_id, course_name, ...}]
        setCourses(result.data);
      } else {
        toast.error(result.error || "Failed to load courses");
      }
    } catch (e) {
      toast.error("Server error while loading courses");
    }
  };

  const loadStudents = async (courseId = "") => {
    try {
      const result = await getAllStudent(courseId);

      if (result.status === "success") {
        // expected student fields:
        // reg_no, name, email, mobile_no, course_name (or course)
        setStudents(result.data);
      } else {
        toast.error(result.error || "Failed to load students");
        setStudents([]);
      }
    } catch (e) {
      toast.error("Server error while loading students");
      setStudents([]);
    }
  };

  useEffect(() => {
    loadCourses();
    loadStudents();
  }, []);

  const onCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    loadStudents(courseId);
  };

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5">
        <div className="card border-0 shadow-sm p-4 bg-white bg-opacity-90 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-md-6 col-lg-7">
              <h2 className="fw-bold mb-1 text-dark">Student Registrations</h2>
              <p className="text-muted mb-0 small">Filter students or view general user profiles</p>
            </div>
            <div className="col-md-6 col-lg-5">
              <div>
                <label className="form-label fw-bold text-muted small mb-1">Filter by Course</label>
                <select className="form-select fw-semibold" style={{ minHeight: "44px" }} value={selectedCourse} onChange={onCourseChange}>
                  <option value="">All Courses</option>
                  {courses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>
                      {c.course_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 bg-white bg-opacity-90">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "80px" }}>Reg No</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Course Name</th>
                  <th>Mobile No</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, idx) => (
                  <tr key={s.reg_no || idx}>
                    <td className="fw-semibold text-muted">#{s.reg_no ?? "-"}</td>
                    <td className="fw-bold text-dark">{s.name ?? "-"}</td>
                    <td><a href={`mailto:${s.email}`} className="text-decoration-none text-primary">{s.email ?? "-"}</a></td>
                    <td><span className="badge bg-light text-dark fw-normal">{s.course_name ?? s.course ?? "N/A"}</span></td>
                    <td className="text-muted">{s.mobile_number ?? s.mobile ?? "-"}</td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No students found in this course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;