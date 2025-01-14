import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('/api/listings')
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching listings:', error);
      });
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>
      <div className="listings">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
