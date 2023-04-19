const mongoose= require('mongoose');

//Assets Schema
const AssetsSchema = new mongoose.Schema({
  tab: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
  },
  last4digits: {
    type: String,
  },
  note: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Assets',AssetsSchema);