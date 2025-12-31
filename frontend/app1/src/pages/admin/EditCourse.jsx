import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourseById,
  updateCourse,
} from "../../services/adminCourseServices";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [videoExpireDays, setVideoExpireDays] = useState("");

  const loadCourse = async () => {
    try {
      const result = await getCourseById(id);

      if (result.status === "success") {
        const c = Array.isArray(result.data) ? result.data[0] : result.data;

        setCourseName(c.course_name);
        setDescription(c.description);
        setFees(c.fees);
        setStartDate(String(c.start_date).slice(0, 10));
        setEndDate(String(c.end_date).slice(0, 10));
        setVideoExpireDays(c.video_expiry_days);
      } else {
        toast.error(result.error || "Failed to load course");
      }
    } catch (err) {
      toast.error("Server error while loading course");
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  const onUpdate = async () => {
    if (!courseName) return toast.warn("Course name is required");

    const token = sessionStorage.getItem("token");

    const body = {
      courseName,
      description,
      fees: Number(fees),
      startDate,
      endDate,
      videoExpireDays: Number(videoExpireDays),
    };

    try {
      const result = await updateCourse(token, id, body);

      if (result.status === "success") {
        toast.success("Course updated successfully");
        navigate("/get-admin-courses");
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (err) {
      toast.error("Server error while updating course");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-4">Update Course</h4>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              className="form-control"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              className="form-control"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Video Expiry Days</label>
            <input
              type="number"
              className="form-control"
              value={videoExpireDays}
              onChange={(e) => setVideoExpireDays(e.target.value)}
            />
          </div>

          <button className="btn btn-info w-100 text-white" onClick={onUpdate}>
            Update Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;