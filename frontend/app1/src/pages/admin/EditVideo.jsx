import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AdminNavbar from "../../components/AdminNavbar"
import {
  getVideoById,
  updateVideo,
  getAllCourses
} from "../../services/adminCourseServices"

function EditVideo() {
  const { videoId } = useParams()
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [courseId, setCourseId] = useState("")
  const [title, setTitle] = useState("")
  const [youtubeURL, setYoutubeURL] = useState("")
  const [description, setDescription] = useState("")

  const token = sessionStorage.getItem("token")

  // load data on page load
  useEffect(() => {
    loadVideo()
    loadCourses()
  }, [])

const loadVideo = async () => {
  const result = await getVideoById(videoId, token)

  if (result.status === "success") {
    const v = result.data[0]
    setCourseId(v.course_id)
    setTitle(v.title)
    setYoutubeURL(v.youtube_url)
    setDescription(v.description)
  }
}

const loadCourses = async () => {
  try {
     const startDate="2025-01-01"
     const endDate="2040-01-01"
     const result= await getAllCourses(token,startDate,endDate)

    console.log("Courses API result:", result) // 🔍 DEBUG

    if (result.status === "success" && Array.isArray(result.data)) {
      setCourses(result.data)
    } else {
      setCourses([])
    }
  } catch (error) {
    console.error(error)
    setCourses([])
  }
}


  const handleUpdate = async () => {
    if (!courseId || !title || !youtubeURL) {
      toast.warning("Please fill all fields")
      return
    }

    const videoData = {
      courseId,
      title,
      youtubeURL,
      description
    }

    const result = await updateVideo(token, videoId, videoData)

    if (result.status === "success") {
      toast.success("Video updated successfully")
      navigate("/get-all-videos")
    } else {
      toast.error("Update failed")
    }
  }

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow-sm border-0 p-4 bg-white bg-opacity-90" style={{ maxWidth: "520px", width: "100%", borderRadius: "16px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Edit Video</h3>
            <p className="text-muted small">Update specific details or link of the video lesson</p>
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
                {Array.isArray(courses) && courses.length > 0 ? (
                  courses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                  ))
                ) : (
                  <option disabled>No courses available</option>
                )}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">Video Title</label>
              <input 
                type="text"
                className="form-control"
                value={title}
                placeholder="Enter the title of video"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold text-muted small">YouTube URL</label>
              <input 
                type="text"
                className="form-control"
                value={youtubeURL}
                placeholder="https://youtube.com/watch?v=..."
                onChange={(e) => setYoutubeURL(e.target.value)}
              />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label fw-semibold text-muted small">Description</label>
              <textarea
                className="form-control"
                rows="2"
                value={description}
                placeholder="Brief description of the lesson content"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary w-100 fw-bold py-3" onClick={handleUpdate}>
              <i className="fas fa-save me-1"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVideo;
