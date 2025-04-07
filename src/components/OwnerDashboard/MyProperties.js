import { useState } from 'react';
import PropertyCard from '../shared/PropertyCard'; // Correct relative path
import './OwnerDashboard.css';

function MyProperties() {
  const [properties] = useState([
    {
      id: 1,
      title: 'Beachfront Villa',
      price: 2500,
      location: 'Miami, FL',
      status: 'occupied',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      bedrooms: 3,
      bathrooms: 2
    }
  ]);

  return (
    <div className="properties-container">
      <h2>My Properties</h2>
      <div className="property-grid">
        {properties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            showOwnerActions={true}
          />
        ))}
      </div>
    </div>
  );
}

export default MyProperties;