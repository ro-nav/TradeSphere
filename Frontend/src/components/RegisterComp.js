import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterComp() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    panCardNumber: '',
    password: '',
    roleType: '',
    bankAccountNumber: '',
    ifscCode: '',
    specialization: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the contact number field is being edited, ensure it's only numeric
    if (name === 'contactNumber' && !/^\d*$/.test(value)) {
      return; // Only allow digits
    }

    // If the bankAccountNumber field is being edited, ensure it's only numeric
    if (name === 'bankAccountNumber' && !/^\d*$/.test(value)) {
      return; // Only allow digits
    }

    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Re-validate the form when a field changes
    validate();
  };

  // Validate the form
  const validate = () => {
    const newErrors = {};

    // Mandatory fields
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.panCardNumber.trim()) newErrors.panCardNumber = 'PAN card number is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.roleType === 'Select Role' || !formData.roleType) newErrors.roleType = 'Please select a role';

    // Specific field validations
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be exactly 10 digits';
    }

    if (formData.panCardNumber && formData.panCardNumber.length !== 10) {
      newErrors.panCardNumber = 'PAN card number must be exactly 10 characters';
    }

    // Allow numeric characters only for bank account number and validate length between 11 and 15
    if (formData.bankAccountNumber && !/^\d{11,15}$/.test(formData.bankAccountNumber)) {
      newErrors.bankAccountNumber = 'Bank account number must be between 11 and 15 digits';
    }

    // Allow uppercase letters followed by 7 digits for IFSC code
    if (formData.ifscCode && !/^[A-Z]{4}\d{7}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'IFSC code must be 4 letters followed by 7 digits (e.g., HDFC0000189)';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-3">
          {errors.username && <div className="text-danger">{errors.username}</div>}
          <label className="form-label">
            Username <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* First Name Field */}
        <div className="mb-3">
          {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          <label className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name Field */}
        <div className="mb-3">
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
          <label className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Contact Number Field */}
        <div className="mb-3">
          {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
          <label className="form-label">
            Contact Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control w-50"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            inputMode="numeric" // Restrict input to numeric keyboard (on mobile devices)
            placeholder="e.g., 9876543210"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          {errors.email && <div className="text-danger">{errors.email}</div>}
          <label className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth Field */}
        <div className="mb-3">
          {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
          <label className="form-label">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control w-50"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* PAN Card Number Field */}
        <div className="mb-3">
          {errors.panCardNumber && <div className="text-danger">{errors.panCardNumber}</div>}
          <label className="form-label">
            PAN Card Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="panCardNumber"
            value={formData.panCardNumber}
            onChange={handleChange}
            maxLength="10"
            placeholder="e.g., ABCDE1234F"
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          {errors.password && <div className="text-danger">{errors.password}</div>}
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Role Type Field */}
        <div className="mb-3">
          {errors.roleType && <div className="text-danger">{errors.roleType}</div>}
          <label className="form-label">
            Role <span className="text-danger">*</span>
          </label>
          <div className="w-50">
            <select
              className="form-select"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              required
            >
              <option value="Select Role">Select Role</option>
              <option value="Trader">Trader</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>
        </div>

        {/* Bank Account Number Field (Only for Trader Role) */}
        {formData.roleType === 'Trader' && (
          <>
            <div className="mb-3">
              {errors.bankAccountNumber && <div className="text-danger">{errors.bankAccountNumber}</div>}
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
                maxLength="15"
                placeholder="e.g., 10235159276"
              />
            </div>

            <div className="mb-3">
              {errors.ifscCode && <div className="text-danger">{errors.ifscCode}</div>}
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
                maxLength="11"
                placeholder="e.g., HDFC0000189"
              />
            </div>
          </>
        )}

        {/* Specialization Field (Only for Analyst Role) */}
        {formData.roleType === 'Analyst' && (
          <div className="mb-3">
            {errors.specialization && <div className="text-danger">{errors.specialization}</div>}
            <label className="form-label">
              Specialization <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
