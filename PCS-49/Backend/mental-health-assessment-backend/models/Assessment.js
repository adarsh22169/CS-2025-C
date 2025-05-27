const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  step1: String,
  step2: String,
  step3: String,
  step4: String,
  step5: String,
  step6: String,
  step7: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
