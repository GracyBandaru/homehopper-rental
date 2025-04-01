import React from 'react';
import { FaKey, FaUser, FaLock } from 'react-icons/fa';
import './Auth.css';

const RentLogin = () => {
  return (
    <div className="auth-page" style={{ backgroundImage: "url('/assets/auth-bg.jpg')" }}>
      <div className="auth-container">
        <div className="auth-header">
          <FaKey className="auth-icon" />
          <h2>Tenant Login</h2>
          <p>Access your rental dashboard</p>
        </div>
        <form>
          <div className="input-group">
            <FaUser />
            <input type="text" placeholder="Email/Username" required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-footer">
          <p>New user? <a href="/rent-signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RentLogin;