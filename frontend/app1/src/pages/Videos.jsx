import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router";
import { getCoursesWithVideos } from "../services/courseServices";
import "../assets/videos.css";
function Videos() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (courseId) fetchVideos();
  }, [courseId]);

  const fetchVideos = async () => {
    const token = sessionStorage.getItem("token");
    const res = await getCoursesWithVideos(token, courseId);

    if (res.status === "success") {
      setVideos(res.data);
      setCurrentIndex(0); 
    }
  };

  const getYouTubeId = (url = "") => {
    if (!url) return "";

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[7].length === 11 ? match[7] : "";
  };

  const currentVideo = videos[currentIndex];

  return (
    <div style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-4">
        <button
          className="btn btn-outline-primary mb-4"
          onClick={() => navigate(-1)}
          style={{ borderRadius: "10px", padding: "8px 20px" }}
        >
          <i className="fas fa-arrow-left me-2"></i> Back
        </button>

        {videos.length !== 0 && (
          <div className="card p-4 border-0 shadow mb-4">
            <h2 className="fw-bold text-center mb-4 text-gradient">
              {videos[0]?.course_name}
            </h2>

            <div className="row g-3 text-center">
              <div className="col-md-3">
                <div className="p-3 rounded border" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                  <div className="text-muted small mb-1">
                    <i className="fas fa-calendar-day me-2 text-primary"></i>
                    Start Date
                  </div>
                  <div className="fw-bold fs-6">
                    {videos[0]?.start_date?.split("T")[0].split("-").reverse().join("-")}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded border" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                  <div className="text-muted small mb-1">
                    <i className="fas fa-calendar-check me-2 text-primary"></i>
                    End Date
                  </div>
                  <div className="fw-bold fs-6">
                    {videos[0]?.end_date?.split("T")[0].split("-").reverse().join("-")}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded border" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                  <div className="text-muted small mb-1">
                    <i className="fas fa-video me-2 text-primary"></i>
                    Total Videos
                  </div>
                  <div className="fw-bold fs-6">{videos.length}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded border" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                  <div className="text-muted small mb-1">
                    <i className="fas fa-graduation-cap me-2 text-success"></i>
                    Status
                  </div>
                  <div className="fw-bold fs-6 text-success">Active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {videos.length !== 0 && (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card p-3 border-0 shadow h-100">
                <iframe
                  className="w-100 rounded"
                  height="450"
                  src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo?.youtube_url)}`}
                  allowFullScreen
                  style={{ border: "none" }}
                />

                <div className="mt-3">
                  <h4 className="fw-bold text-dark">{currentVideo?.title}</h4>
                  <p className="text-muted">{currentVideo?.description}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card p-3 border-0 shadow">
                <h5 className="fw-bold text-dark mb-3">Course Curriculum</h5>
                <div className="list-group list-group-flush rounded" style={{ overflow: "hidden" }}>
                  {videos.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`list-group-item list-group-item-action border-0 d-flex align-items-center mb-2 ${i === currentIndex ? "bg-primary bg-opacity-10 text-primary fw-bold" : "text-dark"}`}
                      style={{ cursor: "pointer", borderRadius: "8px", transition: "all 0.2s" }}
                      onClick={() => setCurrentIndex(i)}
                    >
                      <span className="me-3 fs-5" style={{ minWidth: "24px" }}>{i + 1}.</span>
                      <span className="text-truncate">{v.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {videos.length === 0 && (
          <div className="container my-5 text-center py-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: "64px", height: "64px", fontSize: "1.75rem" }}>
              <i className="fas fa-video-slash"></i>
            </div>
            <h2 className="fw-bold">No Videos Available</h2>
            <p className="text-muted">Stay tuned! Course materials will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
