import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../services/adminCourseServices";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [videoExpireDays, setVideoExpireDays] = useState("");

  const navigate = useNavigate();

  const onAdd = async () => {
    if (!courseName) return toast.warn("Course name is required");
    if (!description) return toast.warn("Description is required");
    if (!fees) return toast.warn("Fees is required");
    if (!startDate) return toast.warn("Start date is required");
    if (!endDate) return toast.warn("End date is required");
    if (!videoExpireDays) return toast.warn("Video expiry days is required");

    const token = sessionStorage.getItem("token");

    // ✅ backend expects these exact keys
    const body = {
      courseName,
      description,
      fees: Number(fees),
      startDate,
      endDate,
      videoExpireDays: Number(videoExpireDays),
    };

    try {
      const result = await addCourse(token, body);

      if (result.status === "success") {
        toast.success("Course added successfully");
        navigate("/get-admin-courses");
      } else {
        toast.error(result.error || "Add course failed");
      }
    } catch (err) {
      toast.error("Server error while adding course");
    }
  };

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow-sm border-0 p-4 bg-white bg-opacity-90" style={{ maxWidth: "520px", width: "100%", borderRadius: "16px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Add Course</h3>
            <p className="text-muted small">Create a brand new course for student learning</p>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Course Name</label>
              <input
                className="form-control"
                placeholder="Enter course name"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Brief summary of what the course covers"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Fees (INR)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter fees amount"
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label fw-semibold text-muted small">Start Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label fw-semibold text-muted small">End Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label fw-semibold text-muted small">Video Expiry Days</label>
              <input
                type="number"
                className="form-control"
                placeholder="Access duration in days"
                onChange={(e) => setVideoExpireDays(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary w-100 fw-bold py-3" onClick={onAdd}>
              <i className="fas fa-plus-circle me-1"></i> Add New Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;