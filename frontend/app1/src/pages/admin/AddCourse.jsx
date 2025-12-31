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
    <div>
      <AdminNavbar />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-4">Add Course</h4>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              className="form-control"
              placeholder="Enter course name"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter fees"
              onChange={(e) => setFees(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Video Expiry Days</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter expiry days"
              onChange={(e) => setVideoExpireDays(e.target.value)}
            />
          </div>

          <button className="btn btn-info w-100 text-white" onClick={onAdd}>
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;