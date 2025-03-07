import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('isAdminAuthenticated');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-title">
      <h1>Product Management Portal</h1>
      </div>
      <div className="nav-actions">
        <button className="nav-button" onClick={handleAuthAction}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;