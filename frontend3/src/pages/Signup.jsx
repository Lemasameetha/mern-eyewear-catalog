import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiconfig";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "User",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/user/signup`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Form Section */}
        <div className="signup-form-section">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              onChange={handleChange}
            />
            <select name="role" onChange={handleChange}>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>

            <button type="submit">Signup</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {error && <p className="error">{error}</p>}
        </div>

        {/* Right Info Section */}
        <div className="signup-info-section">
          <h2>Welcome to Eyewear Catalog</h2>
          <p>Join us and explore stylish eyewear for every personality!</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
