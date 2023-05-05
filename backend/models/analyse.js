const mongoose = require('mongoose')
const Role = require("../_helpers/role")

const analyseSchema = new mongoose.Schema({
    analyseName:{type: String, required: true },
    
})
module.exports = mongoose.model("Analyse", analyseSchema);