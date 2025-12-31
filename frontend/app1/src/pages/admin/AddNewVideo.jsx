import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
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
        const result=await getAllCourses(token,"2025-01-01","2027-01-01")
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
    <div>
      <AdminNavbar />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-4">Add New Video</h4>

          <div className="mb-3">
            <label className="form-label ">Course Name</label>
      <select value={courseId} className="form-control " onChange={(e)=>{setCourseId(Number(e.target.value))}}>
        <option>select the course</option>
        {courses.map((c)=>(
          <option key={c.course_id} value={c.course_id} >{c.course_name}</option>
        ))}
      
      </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input type="text"
              className="form-control"
              placeholder="Enter the title of video"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Youtube URL</label>
            <input type="text"
              className="form-control"
              placeholder="Enter the youtube URL"
              onChange={(e) => setYoutubeURL(e.target.value)}
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
    
          <button className="btn btn-info w-100 text-white" onClick={onAdd}>
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewVideo;