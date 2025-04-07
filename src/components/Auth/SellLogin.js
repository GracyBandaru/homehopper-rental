import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock , FaHandshake} from 'react-icons/fa';
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
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-footer">
          <p>Not registered? <Link to="/sell-register">List your property</Link></p>
          
          {/* Add this line for dashboard navigation */}
          <p style={{ marginTop: '10px' }}>
            <Link to="/owner" className="dashboard-link">
              Go to Dashboard (Demo)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellLogin;