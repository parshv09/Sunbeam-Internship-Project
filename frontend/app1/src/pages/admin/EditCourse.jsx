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
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow-sm border-0 p-4 bg-white bg-opacity-90" style={{ maxWidth: "520px", width: "100%", borderRadius: "16px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Update Course</h3>
            <p className="text-muted small">Update specific details of the course</p>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Course Name</label>
              <input
                className="form-control"
                value={courseName}
                placeholder="Enter course name"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Description</label>
              <textarea
                className="form-control"
                rows="2"
                value={description}
                placeholder="Brief summary of what the course covers"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Fees (INR)</label>
              <input
                type="number"
                className="form-control"
                value={fees}
                placeholder="Enter fees amount"
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label fw-semibold text-muted small">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label fw-semibold text-muted small">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label fw-semibold text-muted small">Video Expiry Days</label>
              <input
                type="number"
                className="form-control"
                value={videoExpireDays}
                placeholder="Access duration in days"
                onChange={(e) => setVideoExpireDays(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary w-100 fw-bold py-3" onClick={onUpdate}>
              <i className="fas fa-save me-1"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;