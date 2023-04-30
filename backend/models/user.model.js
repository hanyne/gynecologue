const mongoose = require('mongoose')
const Role = require("../_helpers/role")

const userSchema = new mongoose.Schema({
    userName:{type: String, required: true },
    password:{type: String, required: true },
    role: {type: String, default: Role.Docteur}
})
module.exports = mongoose.model("User", userSchema);