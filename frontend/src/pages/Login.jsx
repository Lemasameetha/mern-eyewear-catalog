import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiconfig";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_BASE_URL}/user/login`, formData);

    // ✅ Store token and role in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    // ✅ Redirect based on role
    // ✅ Replace this block in handleSubmit:
    const role = res.data.role;
    localStorage.setItem("role", role);
    navigate("/dashboard");


  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Form */}
        <div className="login-form-section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
          {error && <p className="error">{error}</p>}
        </div>

        {/* Right Side - Info */}
        <div className="login-info-section">
          <h2>Eyewear Catalog</h2>
          <p>Style. Comfort. Vision. All in One Frame.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
