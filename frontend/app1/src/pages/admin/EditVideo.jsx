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
     const endDate="2026-01-01"
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
    <div>
      <AdminNavbar />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-4">Edit Video</h4>

          <div className="mb-3">
            <label className="form-label">Course Name</label>
                <select
                className="form-control"
                value={courseId}
                onChange={(e) => setCourseId(Number(e.target.value))}
                >
                <option value="">Select the course</option>

                {Array.isArray(courses) && courses.length > 0 ? (
                    courses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>
                        {c.course_name}
                    </option>
                    ))
                ) : (
                    <option disabled>No courses available</option>
                )}
                </select>

          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Youtube URL</label>
            <input
              type="text"
              className="form-control"
              value={youtubeURL}
              onChange={(e) => setYoutubeURL(e.target.value)}
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

          <button
            className="btn btn-info w-100 text-white"
            onClick={handleUpdate}
          >
            Update Video
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditVideo
