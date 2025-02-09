import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeComp.css";

export default function HomeComp() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid home-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="gradient-overlay"></div>
      <div className="card welcome-card text-center text-white">
        <div className="card-body p-5">
          <h1 className="card-title display-4 fw-bold">
            Welcome to TradeSphere
          </h1>
          <p className="card-text lead mt-3">
            Manage your trades, analyze market trends, and make data-driven
            decisions with ease.
          </p>
          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg me-3 custom-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-light btn-lg custom-btn"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
