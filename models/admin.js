const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, default: "user" }
})

module.exports = mongoose.model("Admin_",adminSchema)