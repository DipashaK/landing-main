const express = require('express');
const router = express.Router();
const Receiver = require('../Models/receiver');

router.post('/', async (req, res) => {
  try {
    const { receiverName, phone, email, gender, organ, bloodGroup } = req.body;
    const report = req.file ? req.file.path : null;

    const newReceiver = new Receiver({
      receiverName,
      phone,
      email,
      gender,
      organ,
      bloodGroup,
      report,
    });

    await newReceiver.save();
    res.status(201).json(newReceiver);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding Receiver', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const receivers = await Receiver.find();
    res.status(200).json(receivers);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error fetching Receivers', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const receiver = await Receiver.findByIdAndDelete(req.params.id);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json({ message: 'Receiver deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting Receiver', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedData = req.body;
    const receiverDoc = await Receiver.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!receiverDoc) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json(receiverDoc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating Receiver', error: err.message });
  }
});

module.exports = router;
