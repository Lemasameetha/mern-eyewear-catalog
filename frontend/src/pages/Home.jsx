import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 import navigation hook
import "./../styles/Home.css";

function Home() {
  const navigate = useNavigate(); // 👈 create navigate function

  const handleGetStarted = () => {
    navigate("/login"); // 👈 redirects to login page
  };

  return (
    <div className="home">
      <h1>Welcome to Eyewear Catalog 👓</h1>
      <p>Browse, manage and explore eyewear collections efficiently!</p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default Home;
