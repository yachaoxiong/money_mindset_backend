const mongoose= require('mongoose');

//
const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  isTotalBudget: {
    type: Boolean,
    required: true,
  },
  budgetType: {
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
  budgetDate: {
    type: Date,
    required: true,
  },
  monthNumber:{
    type:Number,
    required:true
  },
  yearNumber:{
    type:Number,
    required:true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Budget',budgetSchema);