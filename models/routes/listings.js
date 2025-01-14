// routes/listings.js
const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add a new listing
router.post('/', async (req, res) => {
  const { title, description, price, location } = req.body;

  try {
    const newListing = new Listing({
      title,
      description,
      price,
      location,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: 'Error creating listing', error });
  }
});

module.exports = router;
