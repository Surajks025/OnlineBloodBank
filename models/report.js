const mongoose = require("mongoose");
const {VerifiedDonation,addVerifiedDonation} = require("./verifiedDonation.js");

const reportSchema = new mongoose.Schema({
    aadhar : {
        type : String,
        required : true,
    },
    weight:{
        type : Number,
        required : true
    },
    pulse:{
        type:Number,
        required : true
    },
    ironLevel : {
        type : Number,
        required : true
    },
    temperature : {
        type : Number,
        required : true
    },
    systolic :{
        type :Number,
        required :true
    },
    diastolic : {
        type : Number,
        required : true
    },
    donationDate:{
        type : Date,
        required : true
    },
    hbsag : {
        type: String,
        required : true
    },
    antihbc:{
        type:String,
        required:true
    },
    hbvnat:{
        type : String,
        required : true
    },
    hcv:{
        type:String,
        required : true
    },
    hcvnat:{
        type:String,
        required:true
    },
    hiv1:{
        type:String,
        requiredd : true
    },
    hiv2:{
        type:String,
        required:true
    },
    htlv1:{
        type:String,
        required : true
    },
    htlv2:{
        type:String,
        required :true
    },
    vdrl:{
        type:String,
        required : true
    },
    pf:{
        type:String,
        required: true
    },
    pv:{
        type:String,
        required : true
    },
    group:{
        type : String,
        required : true
    },
    rh:{
        type:String,
        required:true
    },
    remark: {
        type : String,
        required : true
    }
});

const Report = new mongoose.model("Report",reportSchema);

const createReport = async (report,pendingDonation)=>{
    const newReport = new Report({
        aadhar : pendingDonation.aadhar,
        weight : pendingDonation.weight,
        pulse : pendingDonation.pulse,
        ironLevel : pendingDonation.ironLevel,
        temperature : pendingDonation.temperature,
        systolic : pendingDonation.systolic,
        diastolic : pendingDonation.diastolic,
        donationDate : pendingDonation.donationDate,
        hbsag : report.hbsag,
        antihbc : report.antihbc,
        hbvnat : report.hbvnat,
        hcv : report.hcv,
        hcvnat : report.hcvnat,
        hiv1 : report.hiv1,
        hiv2 : report.hiv2,
        htlv1 : report.htlv1,
        htlv2 : report.htlv2,
        vdrl : report.vdrl,
        pf : report.pf,
        pv : report.pv,
        group : report.group,
        rh : report.rh,
        remark : report.remark
    });

    const STATUS = report.STATUS;

    try{
        const generated = await newReport.save();
        await addVerifiedDonation(generated,STATUS);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Report,createReport};