import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterComp.css";

export default function RegisterComp() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    dateOfBirth: "",
    panCardNumber: "",
    password: "",
    roleType: "",
    bankAccountNumber: "",
    ifscCode: "",
    specialization: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Numeric-only fields
    if (
      (name === "contactNumber" || name === "bankAccountNumber") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 4)
          error = "Username must be at least 4 characters";
        break;
      case "firstName":
        if (!value.trim()) error = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;
      case "contactNumber":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Contact number must be exactly 10 digits";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "dateOfBirth":
        if (!value.trim()) error = "Date of birth is required";
        else {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          if (age < 18) error = "You must be at least 18 years old to register";
          if (dob > today) error = "Date of birth cannot be in the future";
        }
        break;
      case "panCardNumber":
        if (!value.trim()) error = "PAN card number is required";
        else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value))
          error = "PAN card number must follow the format: ABCDE1234F";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}/.test(
            value
          )
        )
          error =
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
        break;
      case "roleType":
        if (value === "Select Role" || !value) error = "Please select a role";
        break;
      case "bankAccountNumber":
      case "ifscCode":
        if (formData.roleType === "Trader") {
          if (!value.trim()) {
            error =
              name === "bankAccountNumber"
                ? "Bank account number is required"
                : "IFSC code is required";
          } else if (
            name === "bankAccountNumber" &&
            !/^\d{11,15}$/.test(value)
          ) {
            error = "Bank account number must be between 11 and 15 digits";
          } else if (name === "ifscCode" && !/^[A-Z]{4}\d{7}$/.test(value)) {
            error = "IFSC code must be 4 letters followed by 7 digits";
          }
        }
        break;
      case "specialization":
        if (formData.roleType === "Analyst" && !value.trim()) {
          error = "Specialization is required";
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Handle field blur to validate the specific field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  // Validate the entire form
  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    console.log(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    if (validate()) {
      // setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8040/crud/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        console.log(response);

        if (response.ok) {
          setFormData({
            username: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            dateOfBirth: "",
            panCardNumber: "",
            password: "",
            roleType: "",
            bankAccountNumber: "",
            ifscCode: "",
            specialization: "",
          });
          navigate("/login"); // Redirect to login page
        } else {
          const errorData = await response.text();
          alert(errorData.message || "Registration failed. Please try again.");
        }
      } catch (err) {
        alert("An error occurred. Please try again later.");
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.username && (
                  <div className="text-danger">{errors.username}</div>
                )}
              </div>
            </div>

            {/* First Name Field */}

            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>
            </div>

            {/* Last Name Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>
            </div>

            {/* Contact Number Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Contact Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  inputMode="numeric" // Restrict input to numeric keyboard (on mobile devices)
                  placeholder="e.g., 9876543210"
                  required
                />
                {errors.contactNumber && (
                  <div className="text-danger">{errors.contactNumber}</div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Date of Birth Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.dateOfBirth && (
                  <div className="text-danger">{errors.dateOfBirth}</div>
                )}
              </div>
            </div>

            {/* PAN Card Number Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  PAN Card Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="panCardNumber"
                  value={formData.panCardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength="10"
                  placeholder="e.g., ABCDE1234F"
                  required
                />
                {errors.panCardNumber && (
                  <div className="text-danger">{errors.panCardNumber}</div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Role Type Field */}
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label">
                  Role <span className="text-danger">*</span>
                </label>
                <div className="d-block mx-auto">
                  <select
                    className="form-select"
                    name="roleType"
                    value={formData.roleType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Trader">Trader</option>
                    <option value="Analyst">Analyst</option>
                  </select>
                </div>
                {errors.roleType && (
                  <div className="text-danger">{errors.roleType}</div>
                )}
              </div>
            </div>

            {/* Bank Account Number Field (Only for Trader Role) */}
            {formData.roleType === "Trader" && (
              <>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Bank Account Number <span className="text-danger">*</span>
                      <small className="text-muted"> (11-15 digits only)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="15"
                      placeholder="e.g., 10235159276"
                      required
                    />
                    {errors.bankAccountNumber && (
                      <div className="text-danger">
                        {errors.bankAccountNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      IFSC Code <span className="text-danger">*</span>
                      <small className="text-muted"> (e.g., HDFC0000189)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="11"
                      placeholder="e.g., HDFC0000189"
                      required
                    />
                    {errors.ifscCode && (
                      <div className="text-danger">{errors.ifscCode}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Specialization Field (Only for Analyst Role) */}
            {formData.roleType === "Analyst" && (
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    Specialization <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.specialization && (
                    <div className="text-danger">{errors.specialization}</div>
                  )}
                </div>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
