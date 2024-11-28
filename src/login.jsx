import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate and Link
import './login.css'; // Optional: for styling
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
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
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8081/api/login', formData);
        console.log('Login successful:', response.data);

        // Assuming the response contains the user's name and you want to pass it to Home1
        const userName = response.data.userName; // Adjust this based on your API response

        // Redirect to Home1 with the user's name
        navigate('/home1', { state: { userName } });
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        setErrors({ form: 'Login failed. Please check your credentials and try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        {errors.form && <p className="error-text">{errors.form}</p>} {/* Display general form errors */}
        <button type="submit">Login</button>
      </form>

      <div className="account-actions">
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link> {/* Add Forgot Password Link */}
      </div>

      <div className="create-account">
        <p>Don't have an account?</p>
        <Link to="/RegistrationPage" className="create-account-link">Create Account</Link> {/* Updated link path */}
      </div>
    </div>
  );
};

export default Login;
