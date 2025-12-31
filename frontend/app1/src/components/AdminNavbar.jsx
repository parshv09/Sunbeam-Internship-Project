import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/adminNav.css"; // keep your custom styles here
import { LoginContext } from "../App";

function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const adminName = "Admin"; // you can replace with dynamic data later
  const { setLoginStatus ,setRole} = useContext(LoginContext);
  const logout = () => {
                    sessionStorage.clear()
                     setLoginStatus(false)
                     setRole("")

    navigate("/login");
  };

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-primary elegant-navbar fw-bold">
  <div className="container">
    {/* Logo */}
    <Link className="navbar-brand elegant-logo text-white" to="/admin/dashboard">
      <div className="logo-container">
        <span className="logo-text">Admin Portal</span>
      </div>
    </Link>

    {/* Mobile Toggle */}
    <button
      className="navbar-toggler border-light"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#adminNav"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="adminNav">

      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link 
            className="nav-link dropdown-toggle elegant-nav-link"
            to="/admin"
          >
            <i className="bi bi-house-door me-2"></i>
            Dashboard
            <span className="active-indicator"></span>
          </Link>
        </li>
      
                <li className="nav-item dropdown mx-2">
          <span className="nav-link dropdown-toggle  elegant-nav-link" role="button" data-bs-toggle="dropdown">
            Courses
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/get-admin-courses">
                Get All Courses
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/add-courses">
                Add Course
              </Link>
            </li>
          </ul>
        </li>

      <li className="nav-item dropdown mx-2">
         <span className="nav-link dropdown-toggle  elegant-nav-link " role="button" data-bs-toggle="dropdown">
            Videos
          </span>
          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/get-all-videos")}>
                Get All Videos
              </span>
            </li>
            <li>
              <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/add-new-video")}>
                Add New Video
              </span>
            </li>
          </ul>
        </li>
      <li className="nav-item dropdown mx-2">
          <span className="nav-link dropdown-toggle elegant-nav-link" role="button" data-bs-toggle="dropdown">
            Students
          </span>
          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item disabled" onClick={()=>{navigate("/getStudents")}}>Get All Students</span>
            </li>
          </ul>
        </li>
      </ul>
  

      

      
    
      {/* Right Section */}
      <div className="d-flex align-items-center">
        {/* Welcome Badge */}
        <div className="welcome-badge me-3 d-none d-lg-flex bg-white bg-opacity-20 rounded-pill">
          <div className="welcome-content">
            <div className="online-dot"></div>
            <span className="welcome-text text-white">
              Hi, {adminName} <span className="welcome-emoji">👋</span>
            </span>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="profile-dropdown position-relative">
          <div
            className="profile-trigger"
            onClick={() => setOpen(!open)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
          >
            <div className="avatar-container">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="profile-avatar border border-2 border-white"
                alt="Profile"
              />
              <div className="online-status bg-success"></div>
            </div>
          </div>

          {open && (
            <div className="elegant-dropdown show">
              {/* Header */}
              <div className="dropdown-header bg-primary">
                <div className="header-content">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="header-avatar border border-2 border-white"
                    alt="Profile"
                  />
                  <div className="header-info">
                    <h6 className="user-name text-white">{adminName}</h6>
                    <small className="user-role text-white opacity-75">Admin</small>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="dropdown-body">
                <Link
                  className="dropdown-item elegant-dropdown-item"
                  to="/change-password"
                  onClick={() => setOpen(false)}
                >
                  <div className="item-icon">
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-title">Change Password</div>
                  </div>
                </Link>

                <div className="dropdown-divider"></div>

                <button
                  className="dropdown-item elegant-dropdown-item logout-item"
                  onClick={logout}
                >
                  <div className="item-icon logout-icon">
                    <i className="bi bi-box-arrow-right"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-title">Logout</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>
  );
}

export default AdminNavbar;
