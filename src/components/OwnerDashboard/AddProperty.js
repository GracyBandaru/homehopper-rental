import { useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaDollarSign, FaBed, FaBath } from 'react-icons/fa';
import './OwnerDashboard.css';
import FloatingHomeButton from '../FloatingHomeButton/FloatingHomeButton';

function AddProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Property added:', formData);
    alert('Property added successfully!');
  };

  return (
    <div className="form-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaHome /> Property Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaDollarSign /> Monthly Rent</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label><FaMapMarkerAlt /> Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaBed /> Bedrooms</label>
            <input
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label><FaBath /> Bathrooms</label>
            <input
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Property Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
          />
        </div>

        <button type="submit" className="submit-btn">List Property</button>
      </form>
    </div>
  );
}

export default AddProperty;