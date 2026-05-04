import React, { startTransition, useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { deleteCourse, deleteVideo, getAllCourses, getVideoDetails } from '../../services/adminCourseServices' // adjust path
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const GetAllVideos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [courses ,setCourses]=useState([])
  const [courseId,setCourseId]=useState(null)
  const navigate=useNavigate()
  // Fetch videos when component loads
  useEffect(()=>{

   
    loadCourse()
  },[])
  useEffect(() => {
   if (courseId !== null) {
    setLoading(true)
    setVideos([])
    fetchVideos(courseId)
  }
    
  },[courseId])

const fetchVideos=async (course_id)=>{
  const token =sessionStorage.getItem('token')
  const result=await getVideoDetails(token,course_id)
  console.log(result)
  if(result.status=="success"){
    setVideos(result.data)
    console.log(result.data)
  }else{
    console.log(result.error)
  }
  setLoading(false)
}

const loadCourse=async ()=>{
  const token= sessionStorage.getItem("token")
  const startDate="2025-01-01"
  const endDate="2040-01-01"
  const result= await getAllCourses(token,startDate,endDate)
  if(result.status=="success"){
      console.log(result.data)
      setCourses(result.data)
      console.log("cor::",courses)
      if(result.data.length > 0){
        setCourseId(Number(result.data[0].course_id))
      } else {
      setLoading(false) // ✅ no courses → stop loading
    }
  } else {
    setLoading(false)
  }
  }
const onDelete = async (videoId) => {
      try {
        const token = sessionStorage.getItem("token");
        const result = await deleteVideo(token, videoId);
  
        if (result.status === "success") {
          toast.success("Video deleted");
          loadCourse();
        } else {
          toast.error(result.error || "Delete failed");
        }
      } catch (err) {
        toast.error("Server error while deleting video");
      }
    };


  // Filter videos by course_id (optional)
  // const filteredVideos =
  //   courseFilter === 'all'
  //     ? videos
  //     : videos.filter(video => video.course_id === parseInt(courseFilter))

  // Dynamically get unique course IDs for dropdown
  // const courseOptions = [...new Set(videos.map(v => v.courseId))]

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div className="container py-5">
        <div className="card border-0 shadow-sm p-4 bg-white bg-opacity-90 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-md-6 col-lg-7">
              <h2 className="fw-bold mb-1 text-dark">Course Videos</h2>
              <p className="text-muted mb-0 small">Select a course to manage and watch available curricula videos</p>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="d-flex flex-column flex-sm-row gap-3">
                <div className="flex-grow-1">
                  <label className="form-label fw-bold text-muted small mb-1">Filter by Course</label>
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
                <div className="align-self-sm-end">
                  <button className="btn btn-primary fw-bold px-3 py-2 w-100" style={{ minHeight: "44px" }} onClick={() => navigate("/add-new-video")}>
                    <i className="fas fa-plus me-1"></i> Add Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 bg-white bg-opacity-90">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>YouTube</th>
                  <th>Added At</th>
                  <th style={{ width: "160px" }} className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      <i className="fas fa-spinner fa-spin me-2"></i> Loading videos...
                    </td>
                  </tr>
                ) : videos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No videos found in this course.
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr key={video.video_id}>
                      <td className="fw-semibold text-muted">#{video.video_id}</td>
                      <td className="fw-bold text-dark">{video.title}</td>
                      <td className="text-muted small" style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {video.description}
                      </td>
                      <td>
                        <a 
                          href={video.youtube_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-link text-primary btn-sm p-0 fw-bold text-decoration-none"
                        >
                          <i className="fab fa-youtube me-1"></i> View URL
                        </a>
                      </td>
                      <td><span className="badge bg-light text-dark fw-normal">{new Date(video.added_at).toLocaleDateString()}</span></td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm fw-bold"
                            onClick={() => navigate(`/edit-video/${video.video_id}`)}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm fw-bold"
                            onClick={() => onDelete(video.video_id)}
                          >
                            <i className="fas fa-trash-alt"></i> Del
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAllVideos;
