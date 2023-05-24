const mongoose = require("mongoose");

const bloodCampSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    venue : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    }
})

const BloodCamp = new mongoose.model("BloodCamp",bloodCampSchema);

const getBloodCamps = async()=>{
    let bloodCamps = await BloodCamp.find();
    let today = new Date().getTime();
    for(let i=0;i<bloodCamps.length;i++){
        if(today > bloodCamps[i].endDate.getTime()){
            await BloodCamp.deleteOne({_id:bloodCamps[i]._id});
        }
    }
    bloodCamps = await BloodCamp.find();
    return bloodCamps;
}

const newCamp = async(camp)=>{
    const newcamp = new BloodCamp({
        name : camp.name,
        venue : camp.venue,
        startDate : camp.startDate,
        endDate : camp.endDate
    });
    await newcamp.save();
}

module.exports = {BloodCamp,getBloodCamps,newCamp};