import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from './loggedSlice';

export default function UpdateProfileComp() {
  const user = useSelector((state) => state.logged.userData);
  const [formData, setFormData] = useState({
    usernameOrEmail: user?.usernameOrEmail || '',
    email: user?.email || '',
    password: '',
    specialization: user?.specialization || '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/user/updateProfile/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const updatedUser = await response.json();
      dispatch(updateProfile(updatedUser)); // Update user data in Redux
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username or Email</label>
          <input
            type="text"
            className="form-control"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {user?.roleType === 'Analyst' && (
          <div className="mb-3">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
