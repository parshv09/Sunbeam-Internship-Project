import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUser } from "../services/userServices";
import { LoginContext } from "../App";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import "../assets/navbar.css"
initMDB({ Dropdown, Collapse });
function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { setLoginStatus } = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getUserProfile();
  }, []);
  const getUserProfile = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getUser(token);

    if (result.status == "success") {
      setName(result.data.name);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm" style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <span className="logo-text fw-bold text-gradient fs-4">
            <i className="fas fa-book-open me-2 text-primary"></i> LMS
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Center Navigation */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/home">
                <i className="fas fa-home me-1 text-primary"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/courses">
                <i className="fas fa-graduation-cap me-1 text-primary"></i> My Courses
              </Link>
            </li>
          </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Welcome Badge */}
            <div className="d-none d-lg-flex align-items-center bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill small fw-semibold">
              <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%", display: "inline-block" }} className="me-2"></span>
              Hi, {name ? name.split(" ")[0] : "Student"}
            </div>

            {/* Profile Dropdown trigger */}
            <div className="dropdown">
              <button
                className="btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center text-decoration-none"
                type="button"
                id="dropdownMenuButton"
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
                <div className="dropdown-menu dropdown-menu-end show shadow border-0 p-2 position-absolute" style={{ right: 0, top: "48px", minWidth: "210px", backgroundColor: "#fff", zIndex: 1050 }}>
                  <div className="p-3 border-bottom mb-2">
                    <h6 className="fw-bold mb-0 text-dark text-truncate">{name || "Student"}</h6>
                    <small className="text-muted text-truncate d-block">Learner Profile</small>
                  </div>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2"
                    to="/profile"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fas fa-user text-muted" style={{ width: "16px" }}></i>
                    <span>My Profile</span>
                  </Link>
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
                    onClick={() => {
                      sessionStorage.clear();
                      setLoginStatus(false);
                      navigate("/");
                    }}
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



export default Navbar;
