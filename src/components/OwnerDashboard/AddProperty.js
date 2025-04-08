import { useState } from 'react';
import axios from 'axios';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaBed, 
  FaBath, 
  FaGlobeAmericas,
  FaSwimmingPool,
  FaWifi
} from 'react-icons/fa';
import './OwnerDashboard.css';
import FloatingHomeButton from '../FloatingHomeButton/FloatingHomeButton';

function AddProperty() {
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    state: '',
    country: '',
    rentAmount: '',
    availabilityStatus: true,
    amenities: '',
    imageFile: null,
    videoFile: null,
    ownerID: '' // This should be set from logged-in user's ID
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // List of valid countries and states
  const validCountries = ["USA", "Canada", "UK", "India", "Australia"];
  const validStates = {
    USA: ["California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    India: ["Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Rajasthan", "West Bengal", "Andhra Pradesh", "Telangana", "Kerala"],
    Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"]
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyName) newErrors.propertyName = 'Property name is required';
    else if (formData.propertyName.length > 255) newErrors.propertyName = 'Cannot exceed 255 characters';

    if (!formData.address) newErrors.address = 'Address is required';
    else if (formData.address.length > 500) newErrors.address = 'Cannot exceed 500 characters';

    if (!formData.state) newErrors.state = 'State is required';
    else if (formData.state.length > 100) newErrors.state = 'Cannot exceed 100 characters';
    else if (formData.country && !validStates[formData.country]?.includes(formData.state)) {
      newErrors.state = 'Invalid state for selected country';
    }

    if (!formData.country) newErrors.country = 'Country is required';
    else if (formData.country.length > 100) newErrors.country = 'Cannot exceed 100 characters';
    else if (!validCountries.includes(formData.country)) {
      newErrors.country = 'Invalid country name';
    }

    if (!formData.rentAmount) newErrors.rentAmount = 'Rent amount is required';
    else if (parseFloat(formData.rentAmount) <= 0) newErrors.rentAmount = 'Must be a positive number';

    if (formData.amenities && formData.amenities.length > 1000) {
      newErrors.amenities = 'Cannot exceed 1000 characters';
    }

    if (!formData.ownerID) newErrors.ownerID = 'Owner ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('PropertyName', formData.propertyName);
      formDataToSend.append('Address', formData.address);
      formDataToSend.append('State', formData.state);
      formDataToSend.append('Country', formData.country);
      formDataToSend.append('RentAmount', formData.rentAmount);
      formDataToSend.append('AvailabilityStatus', formData.availabilityStatus);
      formDataToSend.append('Amenities', formData.amenities);
      if (formData.imageFile) formDataToSend.append('ImageFile', formData.imageFile);
      if (formData.videoFile) formDataToSend.append('VideoFile', formData.videoFile);
      formDataToSend.append('OwnerID', formData.ownerID);

      const token = localStorage.getItem('ownerToken');
      const response = await axios.post('http://localhost:5162/api/property', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Property added successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2><FaHome /> Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaHome /> Property Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
          />
          {errors.propertyName && <span className="error">{errors.propertyName}</span>}
        </div>

        <div className="form-group">
          <label><FaMapMarkerAlt /> Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaGlobeAmericas /> Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              {validCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {formData.country && validStates[formData.country]?.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        </div>

        <div className="form-group">
          <label><FaDollarSign /> Monthly Rent</label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
          {errors.rentAmount && <span className="error">{errors.rentAmount}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="availabilityStatus"
              checked={formData.availabilityStatus}
              onChange={handleChange}
            />
            Available for Rent
          </label>
        </div>

        <div className="form-group">
          <label><FaSwimmingPool /> <FaWifi /> Amenities (comma separated)</label>
          <textarea
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="Swimming pool, WiFi, Parking, etc."
          />
          {errors.amenities && <span className="error">{errors.amenities}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Property Image</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Property Video (optional)</label>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <input
          type="hidden"
          name="ownerID"
          value={formData.ownerID}
          // In a real app, you would set this from the logged-in user's ID
          onChange={handleChange}
        />
        {errors.ownerID && <span className="error">{errors.ownerID}</span>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Property...' : 'List Property'}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;