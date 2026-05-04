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
    <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm py-3" style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/admin">
          <span className="logo-text fw-bold text-gradient fs-4">
            <i className="fas fa-user-shield me-2 text-primary"></i> Admin Portal
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="adminNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/admin">
                <i className="fas fa-chart-line me-1 text-primary"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fw-semibold px-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-graduation-cap me-1 text-primary"></i> Courses
              </a>
              <ul className="dropdown-menu border-0 shadow">
                <li>
                  <Link className="dropdown-item d-flex align-items-center gap-2" to="/get-admin-courses">
                    <i className="fas fa-list text-muted"></i> View Courses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center gap-2" to="/add-courses">
                    <i className="fas fa-plus-circle text-muted"></i> Add Course
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fw-semibold px-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-video me-1 text-primary"></i> Videos
              </a>
              <ul className="dropdown-menu border-0 shadow">
                <li>
                  <Link className="dropdown-item d-flex align-items-center gap-2" to="/get-all-videos">
                    <i className="fas fa-film text-muted"></i> View Videos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center gap-2" to="/add-new-video">
                    <i className="fas fa-plus-square text-muted"></i> Add Video
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/getStudents">
                <i className="fas fa-users me-1 text-primary"></i> Students
              </Link>
            </li>
          </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Welcome Badge */}
            <div className="d-none d-lg-flex align-items-center bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill small fw-semibold">
              <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%", display: "inline-block" }} className="me-2"></span>
              Hi, Admin
            </div>

            {/* Profile Dropdown trigger */}
            <div className="dropdown">
              <button
                className="btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center text-decoration-none"
                type="button"
                onClick={() => setOpen(!open)}
                style={{ outline: "none" }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle border"
                  alt="Profile"
                  style={{ width: "38px", height: "38px", objectFit: "cover" }}
                />
              </button>

              {open && (
                <div className="dropdown-menu dropdown-menu-end show shadow border-0 p-2 position-absolute" style={{ right: 0, top: "48px", minWidth: "200px", backgroundColor: "#fff", zIndex: 1050 }}>
                  <div className="p-3 border-bottom mb-2">
                    <h6 className="fw-bold mb-0 text-dark text-truncate">Admin</h6>
                    <small className="text-muted text-truncate d-block">Super User</small>
                  </div>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2"
                    to="/change-password"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fas fa-key text-muted" style={{ width: "16px" }}></i>
                    <span>Change Password</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt text-danger" style={{ width: "16px" }}></i>
                    <span>Logout</span>
                  </button>
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
