import { FaUser, FaHome, FaCheck, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import './OwnerDashboard.css';

function RentalApplications() {
  const [applications] = useState([
    {
      id: 1,
      tenant: 'Alice Johnson',
      property: 'Beachfront Villa',
      date: '2023-06-15',
      status: 'pending',
      email: 'alice@example.com',
      phone: '(555) 123-4567'
    },
    {
      id: 2,
      tenant: 'Bob Smith',
      property: 'Downtown Loft',
      date: '2023-06-10',
      status: 'approved',
      email: 'bob@example.com',
      phone: '(555) 987-6543'
    }
  ]);

  const handleDecision = (id, decision) => {
    console.log(`Application ${id} ${decision}`);
    alert(`Application ${decision}!`);
  };

  return (
    <div className="applications-container">
      <h2>Rental Applications</h2>
      
      <div className="applications-list">
        {applications.map(app => (
          <div key={app.id} className="application-card">
            <div className="application-header">
              <h3>{app.tenant}</h3>
              <span className={`status-badge ${app.status}`}>
                {app.status.toUpperCase()}
              </span>
            </div>
            
            <div className="application-details">
              <p><FaHome /> {app.property}</p>
              <p>Applied: {app.date}</p>
              <p><FaEnvelope /> {app.email}</p>
              <p><FaPhone /> {app.phone}</p>
            </div>
            
            {app.status === 'pending' && (
              <div className="decision-buttons">
                <button 
                  className="approve-btn"
                  onClick={() => handleDecision(app.id, 'approved')}
                >
                  <FaCheck /> Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleDecision(app.id, 'rejected')}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RentalApplications;