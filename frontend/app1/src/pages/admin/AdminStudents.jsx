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
    <div>
      <AdminNavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">All Students</h2>

        <div className="mb-3" style={{ maxWidth: 400 }}>
          <label className="form-label fw-semibold">Filter by Course</label>
          <select className="form-select" value={selectedCourse} onChange={onCourseChange}>
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Mobile No</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, idx) => (
              <tr key={s.reg_no || idx}>
                <td>{s.reg_no ?? "-"}</td>
                <td>{s.name ?? "-"}</td>
                <td>{s.email ?? "-"}</td>
                <td>{s.course_name ?? s.course ?? "N/A"}</td>
                <td>{s.mobile_number ?? s.mobile ?? "-"}</td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStudents;