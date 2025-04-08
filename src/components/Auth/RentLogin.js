import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaHome } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const RentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5162/api/Tenant/login', {
        email,
        password // Sending plain text password
      });

      if (response.data.token) {
        localStorage.setItem('tenantToken', response.data.token);
        navigate('/tenant');
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <FaHome className="auth-icon" />
          <h2>Tenant Login</h2>
          <p>Access your rental account</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/rent-register">Register here</Link></p>
         
        </div>
      </div>
    </div>
  );
};

export default RentLogin;