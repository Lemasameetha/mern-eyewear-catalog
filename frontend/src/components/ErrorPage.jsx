import React from "react";
import "../styles/ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h3 className="error-heading">Something Went Wrong</h3>
      <p className="error-message">
        We're sorry, but an error occurred. Please try again later.
      </p>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
