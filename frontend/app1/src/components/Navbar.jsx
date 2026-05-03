import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUser } from "../services/userServices";
import { LoginContext } from "../context/LoginConext";
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
  <nav className="navbar navbar-expand-lg navbar-light elegant-navbar">
  <div className="container">
    {/* Logo */}
    <Link className="navbar-brand elegant-logo" to="/">
      <div className="logo-container">
       
        <span className="logo-text">MyApp</span>
      </div>
    </Link>

    {/* Mobile Toggle */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-label="Toggle navigation"
    >
      <div className="hamburger-lines">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </button>

    {/* Menu */}
    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
      {/* Center Navigation */}
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link 
            className="nav-link elegant-nav-link"
            to="/home"
          >
            <i className="bi bi-house-door me-2"></i>
            Home
            <span className="active-indicator"></span>
          </Link>
        </li>
        
        <li className="nav-item mx-2">
          <Link 
            className="nav-link elegant-nav-link"
            to="/courses"
          >
            <i className="bi bi-book me-2"></i>
            My Courses
            <span className="active-indicator"></span>
          </Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="d-flex align-items-center">
        {/* Welcome Badge */}
        <div className="welcome-badge me-3 d-none d-lg-flex">
          <div className="welcome-content">
            <div className="online-dot"></div>
            <span className="welcome-text">
              Hi, {name.split(" ")[0]} <span className="welcome-emoji">👋</span>
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
            onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
          >
            <div className="avatar-container">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="profile-avatar"
                alt="Profile"
              />
              <div className="online-status"></div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="elegant-dropdown show">
              {/* Header */}
              <div className="dropdown-header">
                <div className="header-content">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="header-avatar"
                    alt="Profile"
                  />
                  <div className="header-info">
                    <h6 className="user-name">{name}</h6>
                  
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="dropdown-body">
                <Link 
                  className="dropdown-item elegant-dropdown-item"
                  to="/profile"
                  onClick={() => setOpen(false)}
                >
                  <div className="item-icon">
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-title">My Profile</div>
                    
                  </div>
                </Link>

                <div className="dropdown-divider"></div>

                <button
                  className="dropdown-item elegant-dropdown-item logout-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
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

export default Navbar;
