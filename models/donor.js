const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    aadhar : {
        type: String,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required : true
    },
    mobile:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:String,
    password : {
        type:String,
        required:true
    },
    dateOfRegistration:{
        type: Date,
        required : true
    }
});

const Donor = new mongoose.model("Donor",donorSchema);

module.exports = Donor;