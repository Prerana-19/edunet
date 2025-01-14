// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/listings');
      setListings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/listings', formData);
      setFormData({ title: '', description: '', price: '', location: '' });
      fetchListings();
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Airbnb Clone</h1>
      </header>
      <main>
        <section>
          <h2>Add a New Listing</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price per night"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Listing</button>
          </form>
        </section>
        <section>
          <h2>Available Listings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {listings.map((listing) => (
                <li key={listing._id}>
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <p><strong>Price:</strong> ${listing.price} per night</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
