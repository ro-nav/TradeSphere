import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AnalystProfile.css";

export default function AnalystProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [analyst, setAnalyst] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8040/crud/user/profile/${user.userid}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setAnalyst(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!analyst) {
    return <p>No profile data available</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Analyst Profile</h2>
      <div className="card shadow-lg p-4 profile-card">
        <div className="text-center mb-4">
          <AccountCircleIcon
            style={{
              fontSize: "150px",
              color: "#cccccc",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              width: "150px",
              height: "150px",
            }}
          />

          <h3 className="card-title mb-2">
            {analyst.firstName && analyst.lastName
              ? `${analyst.firstName} ${analyst.lastName}`
              : analyst.name || "No Name Available"}
          </h3>
        </div>

        <table className="table table-bordered profile-table">
          <tbody>
            <tr>
              <th>Username</th>
              <td>{analyst.username}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{analyst.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{analyst.lastName}</td>
            </tr>
            <tr>
              <th>Contact Number</th>
              <td>{analyst.contactNumber}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{analyst.email}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{analyst.dateOfBirth}</td>
            </tr>
            <tr>
              <th>PAN Card Number</th>
              <td>{analyst.panCardNumber}</td>
            </tr>
            <tr>
              <th>Role Type</th>
              <td>{analyst.roleType}</td>
            </tr>
            <tr>
              <th>Specialization</th>
              <td>{analyst.specialization}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-3">
          <Link to="/analyst/updateprofile" className="btn btn-primary">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
