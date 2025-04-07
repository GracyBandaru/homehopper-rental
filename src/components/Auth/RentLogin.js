import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaHome } from 'react-icons/fa';
import './Auth.css';

const RentLogin = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <FaHome className="auth-icon" />
          <h2>Tenant Login</h2>
          <p>Access your rental account</p>
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
          <p>Don't have an account? <Link to="/rent-register">Register here</Link></p>
          <p className="demo-link">
            <Link to="/tenant">Go to Tenant Dashboard (Demo)</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentLogin;