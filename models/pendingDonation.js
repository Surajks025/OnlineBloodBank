const mongoose = require("mongoose");

const pendingDonationSchema = new mongoose.Schema({
    aadhar : {
        type:String,
        required : true,
        unique : true
    },
    weight:{
        type : Number,
        required : true,
    },
    pulse : {
        type : Number,
        required : true
    },
    ironLevel : {
        type:Number,
        required : true
    },
    temperature : {
        type:Number,
        required : true
    },
    systolic : {
        type:Number,
        required : true
    },
    diastolic : {
        type : Number,
        required : true
    },
    donationDate:{
        type:Date,
        required : true
    }
});

const PendingDonation = new mongoose.model("PendingDonation",pendingDonationSchema);

const addPendingDonation = async (aadhar,details)=>{
    const newPendingDonation = new PendingDonation({
        aadhar : aadhar,
        weight : details.weight,
        pulse : details.pulse,
        ironLevel : details.ironLevel,
        temperature : details.temperature,
        systolic : details.systolic,
        diastolic : details.diastolic,
        donationDate : new Date()
    });
    try{
        await newPendingDonation.save();
        console.log("New Pending Donation added successfully....");
    }
    catch(err){
        console.log(err);
    }
}

const deletePendingDonation = async (pendingDonationId)=>{
    try{
        await PendingDonation.deleteOne({_id : pendingDonationId});
        console.log("Pending Donation Deleted successfully...");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {PendingDonation,addPendingDonation,deletePendingDonation};