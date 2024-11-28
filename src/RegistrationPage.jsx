import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import './RegistrationPage.css'; // Optional: for styling
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    // Add more validation rules as needed
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send form data to the server
        const response = await axios.post('http://localhost:8081/api/register', formData);
  
        // Handle successful response (e.g., show a success message, navigate, etc.)
        console.log('Response:', response.data);
        
        // Redirect to the login page after successful registration
        navigate('/login');
      } catch (error) {
        // Handle error response
        console.error('Error during registration:', error.response?.data || error.message);
        // You can set error messages here if you want to show them in the UI
        // setErrors({ server: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-redirect">
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default RegistrationPage;
