const mongoose = require("mongoose");

const verifiedDonationSchema = new mongoose.Schema({
    aadhar : {
        type : String,
        required : true,
    },
    reportId : {
        type : String,
        required : true,
        unique : true
    },
    STATUS : {
        type : String,
        required : true
    }
});

const VerifiedDonation = new mongoose.model("VerifiedDonation",verifiedDonationSchema);

const addVerifiedDonation = async (report,STATUS)=>{
    const newDonation = new VerifiedDonation({
        aadhar : report.aadhar,
        reportId : report._id,
        STATUS : STATUS
    });
    try{
        await newDonation.save();
        console.log("Donation Verified Successfully...");
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {VerifiedDonation,addVerifiedDonation};