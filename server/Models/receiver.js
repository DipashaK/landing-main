const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  receiverName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  organ: { type: String, required: true },
  bloodGroup: { type: String, required: true },
});

module.exports = mongoose.model('Receiver', receiverSchema);