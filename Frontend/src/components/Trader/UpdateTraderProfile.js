import React, { useState, useEffect } from "react";

export default function UpdateTraderProfile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo.userid; // Retrieve the user ID from localStorage

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    contact: "",
    email: "",
    dob: "",
    pancard: "",
    accNo: "",
    ifsc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:8040/crud/user/profile/${userId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      console.log("Fetched profile data:", data); // Debugging log

      setFormData({
        fname: data.firstName || "",
        lname: data.lastName || "",
        contact: data.contactNumber || "",
        email: data.email || "",
        dob: data.dateOfBirth || "",
        pancard: data.panCardNumber || "",
        accNo: data.bankAccountNumber || "",
        ifsc: data.ifscCode || "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      fname: formData.fname,
      lname: formData.lname,
      contact: formData.contact,
      email: formData.email,
      dob: formData.dob,
      pancard: formData.pancard,
      accNo: formData.bankAccountNumber,
      ifsc: formData.ifscCode,
    };

    try {
      const response = await fetch(
        `http://localhost:8040/crud/user/updateProfile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      console.log("Update response:", result); // Debugging log
      setSuccess(true); // Show success message
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Update Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {success && <p className="text-success">Profile updated successfully!</p>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>PAN Card Number</label>
            <input
              type="text"
              className="form-control"
              name="pancard"
              value={formData.pancard}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              name="accNo"
              value={formData.accNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>IFSC Code</label>
            <input
              type="text"
              className="form-control"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}
