import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  // optional: to capture inputs (for future API)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload

    // ✅ TEMP LOGIN LOGIC (replace with backend later)
    if (username && password) {
      // 🔑 STEP 1: SAVE LOGIN STATUS
      localStorage.setItem("isLoggedIn", "true");

      // optional: store username
      localStorage.setItem("userName", username);

      // Redirect to Home page
      navigate("/");
    }
  };

  return (
    <div className="login-body">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="button-btn">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
