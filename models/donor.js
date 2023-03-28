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
    const aadhar = donor.aadhar;
    const name = donor.name.trim();
    const fname = donor.fname.trim();
    const email = donor.email.trim();
    const gender = donor.gender;
    const mobile =  donor.mobile;
    const dob = new Date(donor.dob);
    const address = donor.address.trim();
    const password = donor.password.trim();
    const newdonor= new Donor({
        aadhar : aadhar,
        name : name,
        fname : fname,
        email : email,
        gender : gender,
        mobile : mobile,
        dob : dob,
        address : address,
        password : md5(password),
        dateOfRegistration : new Date()
    });
    try{
        await newdonor.save();
        console.log("Donor Saved Successfullly....");
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
            aadhar : donor.aadhar,
            name : donor.name,
            fname : donor.fname,
            email : donor.email,
            gender : donor.gender,
            mobile : donor.mobile,
            dob : donor.dob,
            address : donor.address
        });
        console.log("Donor edited successfully....")
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Donor,addDonor,deleteDonor,editDonor};