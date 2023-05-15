const mongoose = require('mongoose');
const ecoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dicom: {
    type: String
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
});

const Eco = mongoose.model('Eco', ecoSchema);

module.exports = Eco;
