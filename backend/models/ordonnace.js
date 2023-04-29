const mongoose = require('mongoose');
const ordonnanceSchema = new mongoose.Schema({
    dateOrd: {
        type: Date,
        required: true
      },
  patiente:{
    userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patiente",
    required: true
  },
  nomP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patiente",
    required: true
  },
  prenomP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patiente",
    required: true
  }
},

  Drug:[{
    drugName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drug",
    required: true
  },
  dosage: {
    type: Number,
    required: true
  }}]
});

module.exports = mongoose.model("ordonnance", ordonnanceSchema);