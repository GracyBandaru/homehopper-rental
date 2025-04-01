import React from 'react';
import { FaHandshake, FaUser, FaLock, FaBuilding } from 'react-icons/fa';
import './Auth.css';

const SellLogin = () => {
  return (
    <div className="auth-page" style={{ backgroundImage: "url('/assets/auth-bg.jpg')" }}>
      <div className="auth-container">
        <div className="auth-header">
          <FaHandshake className="auth-icon" />
          <h2>Landlord Portal</h2>
          <p>Manage your properties</p>
        </div>
        <form>
          <div className="input-group">
            <FaUser />
            <input type="text" placeholder="Agent ID/Email" required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-group">
            <FaBuilding />
            <input type="text" placeholder="Company Code (Optional)" />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-footer">
          <p>Not registered? <a href="/seller-register">List your property</a></p>
        </div>
      </div>
    </div>
  );
};

export default SellLogin;