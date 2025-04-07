import { useState } from 'react';
import { FaFilePdf, FaCheck, FaTimes } from 'react-icons/fa';
import './OwnerDashboard.css';

function LeaseAgreements() {
  const [agreements, setAgreements] = useState([
    { 
      id: 1, 
      tenant: 'Alice Johnson', 
      property: 'Beach Villa',
      status: 'pending',
      document: 'lease_agreement_123.pdf'
    }
  ]);

  const handleDecision = (id, decision) => {
    setAgreements(agreements.map(agreement => 
      agreement.id === id ? { ...agreement, status: decision } : agreement
    ));
  };

  const handleDocumentUpload = (id, file) => {
    // In a real app, this would upload to your backend
    console.log(`Uploading document for agreement ${id}:`, file.name);
    setAgreements(agreements.map(agreement => 
      agreement.id === id ? { ...agreement, status: 'completed' } : agreement
    ));
  };

  return (
    <div className="lease-agreements">
      <h2>Lease Agreements</h2>
      
      <div className="agreements-list">
        {agreements.map(agreement => (
          <div key={agreement.id} className="agreement-card">
            <div className="agreement-info">
              <h3>{agreement.tenant}</h3>
              <p>Property: {agreement.property}</p>
              <p>Status: <span className={`status-${agreement.status}`}>{agreement.status}</span></p>
              
              {agreement.document && (
                <a href="#" className="document-link">
                  <FaFilePdf /> View Agreement
                </a>
              )}
            </div>

            {agreement.status === 'pending' && (
              <div className="agreement-actions">
                <button 
                  className="btn-accept"
                  onClick={() => handleDecision(agreement.id, 'approved')}
                >
                  <FaCheck /> Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleDecision(agreement.id, 'rejected')}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}

            {agreement.status === 'approved' && (
              <div className="upload-section">
                <p>Upload signed document:</p>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleDocumentUpload(agreement.id, e.target.files[0])}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaseAgreements;