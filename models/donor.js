const mongoose = require("mongoose");
const md5 = require("md5");

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

const addDonor = async (donor) =>{
    const newdonor= new Donor({
        aadhar : donor.aadhar,
        name : donor.name.trim(),
        fname : donor.fname.trim(),
        email : donor.email.trim(),
        gender : donor.gender,
        mobile : donor.mobile,
        dob : donor.dob,
        address : donor.address.trim(),
        password : md5(donor.password.trim()),
        dateOfRegistration : new Date()
    });
    try{
        await newdonor.save();
    }
    catch(err){
        console.log(err);
    }
}

const deleteDonor = async (donorId)=>{
    try{
        await Donor.deleteOne({_id : donorId});
        console.log("Donor Deleted Successfully.....");
    }
    catch(err){
        console.log(err);
    }
}

const editDonor = async (donorId,donor)=>{
    try{
        await Donor.findOneAndUpdate({_id:donorId},{
            name : donor.name.trim(),
            fname : donor.fname.trim(),
            email : donor.email.trim(),
            gender : donor.gender,
            mobile : donor.mobile,
            dob : donor.dob,
            address : donor.address.trim()
        });
        console.log("Donor edited successfully....")
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Donor,addDonor,deleteDonor,editDonor};