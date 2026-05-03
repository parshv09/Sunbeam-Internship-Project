import { useState ,useContext} from "react";
import "../App.css";

import { loginUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/LoginConext";

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
    <div className="d-flex align-items-center justify-content-center vh-100 my-5 pt-5">
      <div className="border p-4 rounded w-25 shadow bg-white">
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
            setPassword(e.target.value);
            }}
          />
          <div className="invalid-feedback">
            Password must be at least 6 characters long.
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={signin}>
          Login
        </button>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <span className="me-2">Don't have an account?</span>
          <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
