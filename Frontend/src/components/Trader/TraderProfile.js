import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Make sure to import the icon

import "./TraderProfile.css"; // Import the CSS file for custom styles

export default function TraderProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    // if (!user) {
    //   // If no user found in sessionStorage, redirect to login page
    //   navigate("/login");
    //   return;
    // }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8040/crud/user/profile/${user.userid}`,
          {
            credentials: "include", // Include session cookie
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setTrader(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]); // Include user in the dependency array to trigger re-fetch if necessary

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!trader) {
    return <p>No profile data available</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Trader Profile</h2>
      <div className="card shadow-lg p-4 profile-card">
        <div className="text-center mb-4">
          {/* If profile picture is missing, show the icon */}
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

          {/* Full Name */}
          <h3 className="card-title mb-2">
            {trader.firstName && trader.lastName
              ? `${trader.firstName} ${trader.lastName}`
              : trader.name || "No Name Available"}
          </h3>
        </div>

        {/* Profile Details in Tabular Format */}
        <table className="table table-bordered profile-table">
          <tbody>
            <tr>
              <th>Username</th>
              <td>{trader.username}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{trader.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{trader.lastName}</td>
            </tr>
            <tr>
              <th>Contact Number</th>
              <td>{trader.contactNumber}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{trader.email}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{trader.dateOfBirth}</td>
            </tr>
            <tr>
              <th>PAN Card Number</th>
              <td>{trader.panCardNumber}</td>
            </tr>
            <tr>
              <th>Role Type</th>
              <td>{trader.roleType}</td>
            </tr>
            <tr>
              <th>Bank Account Number</th>
              <td>{trader.bankAccountNumber}</td>
            </tr>
            <tr>
              <th>IFSC Code</th>
              <td>{trader.ifscCode}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-3">
          <Link to="/trader/updateprofile" className="btn btn-primary">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
