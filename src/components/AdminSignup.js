import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      navigate('/admin/login');
    } catch (err) {
      setError('Failed to create admin account');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <i className="fas fa-user-plus"></i>
          <h2>MedTranslate Pro</h2>
          <p>Create Admin Account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            <i className="fas fa-user-plus"></i> Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup; 