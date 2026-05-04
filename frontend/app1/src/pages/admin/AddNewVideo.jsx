import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  addVideo, getAllCourses } from "../../services/adminCourseServices";

function AddNewVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");


  const [courseId,setCourseId]=useState(0)
  const [courses,setCourses]=useState([])
  const navigate = useNavigate();

    useEffect(()=>{
        loadCourses()
    },[])

    const loadCourses=async ()=>{
        const token =sessionStorage.getItem("token")
        const result=await getAllCourses(token,"2025-01-01","2040-01-01")
        if(result.status=="success"){
            setCourses(result.data)
            console.log(result.data)
        }
    }


  const onAdd = async () => {
    if (!courseId) return toast.warn("Course selection is required");
    if (!description) return toast.warn("Description is required");
    if (!title) return toast.warn("title is required");
    if (!youtubeURL) return toast.warn("youtubr URL is required");

    const token = sessionStorage.getItem("token");

    // ✅ backend expects these exact keys
    const body = {
      courseId,
      title,
      youtubeURL,
      description
    };
    console.log(body)
      const result = await addVideo(token, body);

      if (result.status === "success") {
        toast.success("video added successfully");
        navigate("/get-all-videos");
      } else {
        toast.error(result.error || "Add video failed");
      }
   
  };

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow-sm border-0 p-4 bg-white bg-opacity-90" style={{ maxWidth: "520px", width: "100%", borderRadius: "16px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Add New Video</h3>
            <p className="text-muted small">Upload or link new course materials</p>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Select Course</label>
              <select 
                value={courseId || ""} 
                className="form-select fw-semibold"
                style={{ minHeight: "44px" }}
                onChange={(e) => { setCourseId(Number(e.target.value)) }}
              >
                <option value="">Select the course</option>
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Video Title</label>
              <input 
                type="text"
                className="form-control"
                placeholder="Enter the title of video"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">YouTube URL</label>
              <input 
                type="text"
                className="form-control"
                placeholder="https://youtube.com/watch?v=..."
                onChange={(e) => setYoutubeURL(e.target.value)}
              />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label fw-semibold text-muted small">Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Brief description of the lesson content"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary w-100 fw-bold py-3" onClick={onAdd}>
              <i className="fas fa-plus-circle me-1"></i> Add Video Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewVideo;