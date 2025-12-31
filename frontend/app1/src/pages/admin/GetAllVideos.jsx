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
    
    <div>
      <AdminNavbar />
    <div className='container mt-4'>
      {/* Filter */}
       <label className="form-label ">Filter by Course</label>
      <select value={courseId} className='form-control' onChange={(e)=>{setCourseId(Number(e.target.value))}}>
        <option value="" >select the course</option>
        {courses.map((c)=>(
          <option key={c.course_id} value={c.course_id} >{c.course_name}</option>
        ))}
      
      </select>

      {/* Table */}
      <div className="table-responsive shadow-sm mt-3">
        <table className="table table-hover align-middle border mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>YouTube</th>
              <th>Added At</th>
                 <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Loading...</td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No videos found</td>
              </tr>
            ) : (
              videos.map(video => (
                <tr key={video.video_id}>
                  <td>{video.video_id}</td>
                  <td>{video.course_id}</td>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                  <td>
                    <a href={video.youtube_url} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </td>
                  <td>{new Date(video.added_at).toLocaleDateString()}</td>
                  <td className='d-flex'>
                  <button
                    className="btn btn-warning btn-sm me-2 mr-3"
                    onClick={() => navigate(`/edit-video/${video.video_id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(video.video_id)}
                  >
                    Delete
                  </button>
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default GetAllVideos;
