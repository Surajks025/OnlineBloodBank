const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema({
    reportId : {
        type: String,
        required : true
    },
    aadhar : {
        type: String,
        required : true
    },
    donationDate :{
        type : Date,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    group : {
        type : String,
        required : true
    },
    rh : {
        type : String,
        required : true
    }
})

const redBloodSchema = new mongoose.Schema({
    reportId : {
        type: String,
        required : true
    },
    aadhar : {
        type: String,
        required : true
    },
    donationDate :{
        type : Date,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    group : {
        type : String,
        required : true
    },
    rh : {
        type : String,
        required : true
    }
})

const plateletsSchema = new mongoose.Schema({
    reportId : {
        type: String,
        required : true
    },
    aadhar : {
        type: String,
        required : true
    },
    donationDate :{
        type : Date,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    group : {
        type : String,
        required : true
    },
    rh : {
        type : String,
        required : true
    }
})

const plasmaSchema = new mongoose.Schema({
    reportId : {
        type: String,
        required : true
    },
    aadhar : {
        type: String,
        required : true
    },
    donationDate :{
        type : Date,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    group : {
        type : String,
        required : true
    },
    rh : {
        type : String,
        required : true
    }
})

const Blood = new mongoose.model("Blood",bloodSchema);
const RedBlood = new mongoose.model("RedBlood",redBloodSchema);
const Platelet = new mongoose.model("Platelet",plateletsSchema);
const Plasma = new mongoose.model("Plasma",plasmaSchema);

const componentize = async (report)=>{
    const weight = report.weight;
    if(weight >= 50){
        let edate = new Date(report.donationDate);
        edate.setDate(edate.getDate()+42);
        const newRedBlood = new RedBlood({
            reportId : report._id,
            aadhar : report.aadhar,
            donationDate : report.donationDate,
            expiryDate : edate,
            group : report.group,
            rh : report.rh
        })
        edate = new Date(report.donationDate);
        edate.setDate(edate.getDate()+5);
        const newPlatelet = new Platelet({
            reportId : report._id,
            aadhar : report.aadhar,
            donationDate : report.donationDate,
            expiryDate : edate,
            group : report.group,
            rh : report.rh
        })
        edate = new Date(report.donationDate);
        edate.setDate(edate.getDate()+364);
        const newPlasma = new Plasma({
            reportId : report._id,
            aadhar : report.aadhar,
            donationDate : report.donationDate,
            expiryDate : edate,
            group : report.group,
            rh : report.rh
        })
        await newRedBlood.save();
        await newPlatelet.save();
        await newPlasma.save();
    }
    else{
        let edate = new Date(report.donationDate);
        edate.setDate(edate.getDate()+35);
        const newBlood = new Blood({
            reportId : report._id,
            aadhar : report.aadhar,
            donationDate : report.donationDate,
            expiryDate : edate,
            group : report.group,
            rh : report.rh
        })
        await newBlood.save();
    }
}

module.exports = {Blood,RedBlood,Platelet,Plasma,componentize};