import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/loggedSlice";

export default function UpdateProfileComp() {
  const user = useSelector((state) => state.logged.userData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    contactNumber: user?.contactNumber || "",
    email: user?.email || "",
    password: "",
    specialization: user?.specialization || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/updateProfile/${user.userid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateProfile(updatedUser));
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Group for Proper Alignment */}
          <div className="d-flex flex-column gap-3">
            {/* Username */}
            <div className="text-center">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                className="form-control text-center"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* First Name */}
            <div className="text-center">
              <label className="form-label fw-bold">First Name</label>
              <input
                type="text"
                className="form-control text-center"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="text-center">
              <label className="form-label fw-bold">Last Name</label>
              <input
                type="text"
                className="form-control text-center"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Contact Number */}
            <div className="text-center">
              <label className="form-label fw-bold">Contact Number</label>
              <input
                type="tel"
                className="form-control text-center"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="text-center">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control text-center"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="text-center">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control text-center"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Specialization (For Analysts) */}
            {user?.roleType === "Analyst" && (
              <div className="text-center">
                <label className="form-label fw-bold">Specialization</label>
                <input
                  type="text"
                  className="form-control text-center"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {success && (
          <div className="alert alert-success mt-3 text-center">
            Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}
