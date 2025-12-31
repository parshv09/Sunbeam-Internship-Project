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
    <div>
      <AdminNavbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">All Courses</h3>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/admin/courses/add")}
          >
            Add Course
          </button>
        </div>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Fees</th>
              <th>Start</th>
              <th>End</th>
              <th>Expiry Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.course_id}>
                <td>{c.course_id}</td>
                <td>{c.course_name}</td>
                <td>{c.description}</td>
                <td>{c.fees}</td>
                <td>{String(c.start_date).slice(0, 10)}</td>
                <td>{String(c.end_date).slice(0, 10)}</td>
                <td>{c.video_expiry_days}</td>
                <td className="d-flex">
                  
                  <button
                    className="btn btn-warning btn-sm me-2 mr-3"
                    onClick={() => navigate(`/update-courses/${c.course_id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(c.course_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {courses.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourses;