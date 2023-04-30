const mongoose = require('mongoose');
const Role = require("../_helpers/role")
const Schema = mongoose.Schema;

// Define collection and schema
let Consultation = new Schema({

   patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    consultdate: { type: String },
    conclusion : { type: String },
    annexe: { type: String },



}, {
   timestamps: true,
   collection: 'consultaion'
})

module.exports = mongoose.model('Consultation', Consultation)