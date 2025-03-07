import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const ADMIN_EMAIL = 'products@gmail.com';
  const ADMIN_PASSWORD = 'products';

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      alert('Admin login successful!');
      navigate('/', { replace: true }); // Prevent login page from being in history
    } else {
      alert('Invalid admin credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  
    // Clear history state after redirecting to login
    setTimeout(() => {
      window.history.pushState(null, '', '/login');
    }, 100);
  };
  

  return (
    <div className="login-page">
      {!isAuthenticated ? (
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Admin Login</h2>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      ) : (
        <div className="welcome-message">
          <h2 className="welcome-title">Welcome, Admin!</h2>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;