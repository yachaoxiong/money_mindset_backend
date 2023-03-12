const mongoose= require('mongoose');

//
const  billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  billType: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});



module.exports = mongoose.model('Bill',billSchema);