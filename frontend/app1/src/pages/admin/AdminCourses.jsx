import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../services/adminCourseServices";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const token = sessionStorage.getItem("token");

      // backend requires dates => use wide range for "all"
      const startDate = "2000-01-01";
      const endDate = "2100-12-31";

      const result = await getAllCourses(token, startDate, endDate);

      if (result.status === "success") {
        setCourses(result.data);
      } else {
        toast.error(result.error || "Failed to load courses");
      }
    } catch (err) {
      toast.error("Server error while loading courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const onDelete = async (courseId) => {
    try {
      const token = sessionStorage.getItem("token");
      const result = await deleteCourse(token, courseId);

      if (result.status === "success") {
        toast.success("Course deleted");
        loadCourses();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error while deleting course");
    }
  };

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5">
        <div className="card border-0 shadow-sm p-4 bg-white bg-opacity-90">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <h2 className="fw-bold mb-1 text-dark">Course Management</h2>
              <p className="text-muted mb-0 small">Create, edit, or delete courses on the platform</p>
            </div>
            <button
              className="btn btn-primary fw-bold px-4 py-2"
              onClick={() => navigate("/add-courses")}
            >
              <i className="fas fa-plus me-1"></i> Add Course
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Fees</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Expiry</th>
                  <th style={{ width: "160px" }} className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr key={c.course_id}>
                    <td className="fw-semibold text-muted">#{c.course_id}</td>
                    <td className="fw-bold text-dark">{c.course_name}</td>
                    <td className="text-muted small" style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.description}
                    </td>
                    <td className="fw-bold text-primary">Rs. {c.fees || 0}</td>
                    <td><span className="badge bg-light text-dark fw-normal">{String(c.start_date).slice(0, 10)}</span></td>
                    <td><span className="badge bg-light text-dark fw-normal">{String(c.end_date).slice(0, 10)}</span></td>
                    <td>{c.video_expiry_days} Days</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm fw-bold"
                          onClick={() => navigate(`/update-courses/${c.course_id}`)}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm fw-bold"
                          onClick={() => onDelete(c.course_id)}
                        >
                          <i className="fas fa-trash-alt"></i> Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No courses found. Add a new course to get started.
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

export default AdminCourses;