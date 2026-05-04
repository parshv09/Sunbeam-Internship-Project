import { useState ,useContext} from "react";
import "../App.css";

import { loginUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { LoginContext } from "../App";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginStatus,setLoginStatus ,role, setRole}=useContext(LoginContext)
  const signin = async (e) => {
    if (email.length == 0) {
      toast.warn("email is required");
      return;
    }
    if (password.length == 0) {
      toast.warn("password is required");
      return;
    }
    const result = await loginUser(email, password);
    console.log(result);
    if (result.status == "success") {
      console.log(result.data)
      sessionStorage.setItem('token',result.data.token)
      setLoginStatus(true)
      if(result.data.role=="student"){
              setRole(result.data.role)
              console.log(loginStatus)
              toast.success("login successful");
              navigate("/home");
      }
      if(result.data.role=="admin"){
        setRole(result.data.role)
              console.log(loginStatus)
              toast.success("login successful");
              navigate("/admin");
      }
    } else {
      toast.error("login failed");
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3 py-5" style={{ background: "var(--bg-gradient)" }}>
      <div className="card shadow-lg p-4 p-md-5 w-100 border-0" style={{ maxWidth: "440px", backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", borderRadius: "var(--radius)" }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "64px", height: "64px" }}>
            <i className="fa-solid fa-user text-primary" style={{ fontSize: "1.75rem" }}></i>
          </div>
          <h2 className="fw-bold mb-1" style={{ color: "var(--dark)" }}>Welcome Back</h2>
          <p className="text-muted small">Please enter your credentials to login</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "10px 0 0 10px" }}>
              <i className="fas fa-envelope text-muted"></i>
            </span>
            <input
              type="email"
              className="form-control border-start-0"
              placeholder="name@example.com"
              style={{ borderRadius: "0 10px 10px 0" }}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signin()}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "10px 0 0 10px" }}>
              <i className="fas fa-lock text-muted"></i>
            </span>
            <input
              type="password"
              className="form-control border-start-0"
              placeholder="Your password"
              style={{ borderRadius: "0 10px 10px 0" }}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signin()}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100 py-2 fw-bold" onClick={signin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
