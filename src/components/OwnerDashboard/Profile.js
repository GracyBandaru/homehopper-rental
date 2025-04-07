import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSave } from 'react-icons/fa';
import './OwnerDashboard.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the backend
    console.log('Profile updated:', profile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <FaUser size={40} />
          </div>
          <h3>{profile.name}</h3>
          <p>Property Owner</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaUser /> Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="form-group">
              <label><FaLock /> New Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
              />
            </div>
          )}

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button type="submit" className="btn-save">
                  <FaSave /> Save Changes
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                type="button" 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;