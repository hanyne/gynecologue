
const mongoose = require('mongoose')
const twilioSchema = new mongoose.Schema({
patienteId: { type: mongoose.Schema.Types.ObjectId, 
        required: true, ref: "patiente" },
        nom: {
                type: String
             },
             prenom: {
                type: String
             },
             naissance: {
                type: String
             },
        
messageBody : {type: String},

})

module.exports = mongoose.model("twilio",twilioSchema);