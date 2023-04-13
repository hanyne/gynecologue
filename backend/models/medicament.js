const mongoose = require('mongoose')
const Role = require("../_helpers/role")

const medicSchema = new mongoose.Schema({
    drugName:{type: String, required: true },
    dosage:{type:Number},
    description:{type:String},
    effetSec:{type:String},
})
module.exports = mongoose.model("Drug", medicSchema);