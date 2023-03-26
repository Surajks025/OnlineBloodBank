const mongoose = require("mongoose");

//Importing updateHospitalTable
const {updateHospitalTable,deleteHospitalTable} = require("./addedHospitalTable.js");

const hospitalSchema = new mongoose.Schema({
    hospitalName : {
        type : String,
        required : true,
        unique : true
    },
    registrationNumber : {
        type:String,
        required : true,
        unique : true
    },
    nodalPerson : {
        type : String,
        required : true,
    },
    telephone : {
        type : String,
        required : true,
        unique : true
    },
    address:{
        type : String,
        required : true
    },
    locality : {
        type:String,
        required : true
    },
    district :{
        type : String,
        required : true
    },
    state : {
        type:String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    }
});

const Hospital = new mongoose.model("Hospital",hospitalSchema);

const addHospital = async (hospital,adminId)=>{
    const newHospital = new Hospital({
        hospitalName : hospital.hospitalName,
        registrationNumber : hospital.registrationNumber,
        nodalPerson : hospital.nodalPerson,
        telephone : hospital.telephone,
        address : hospital.address,
        locality : hospital.locality,
        district : hospital.district,
        state : hospital.state,
        pincode : hospital.pincode
    });
    try{
        const hospital = await newHospital.save();
        await updateHospitalTable(hospital._id,adminId);
        console.log("Hospital Saved Successfully...");
    }
    catch(err){
        console.log(err);
    }
}

const deleteHospital = async(hospitalId)=>{
    try{
        await deleteHospitalTable(hospitalId);
        await Hospital.deleteOne({_id : hospitalId});
    }
    catch(err){
        console.log(err);
    }
}

const editHospital = async (hospitalId,hospital)=>{
    try{
        await Hospital.findOneAndUpdate({_id : hospitalId},
        {
            hospitalName : hospital.hospitalName,
            registrationNumber : hospital.registrationNumber,
            nodalPerson : hospital.nodalPerson,
            telephone : hospital.telephone,
            address : hospital.address,
            locality : hospital.locality,
            district : hospital.district,
            state : hospital.state,
            pincode : hospital.pincode
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Hospital,addHospital,deleteHospital,editHospital};