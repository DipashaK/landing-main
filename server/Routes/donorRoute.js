const express = require('express');
const router = express.Router();
const Donation = require('../Models/donation');

router.post('/', async (req, res) => {
  try {
    const { donorName, phone, email, gender, organ, bloodGroup } = req.body;

    const newDonation = new Donation({
      donorName,
      phone,
      email,
      gender,
      organ,
      bloodGroup
    });

    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding donation', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error fetching donations', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting donation', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedData = req.body;

    const donation = await Donation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(donation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating donation', error: err.message });
  }
});

module.exports = router;