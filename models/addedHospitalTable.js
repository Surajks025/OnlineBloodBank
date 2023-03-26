const mongoose = require ("mongoose");

const hospitalTableSchema = new mongoose.Schema({
    hospitalId : {
        type:String,
        required : true,
        unique : true
    },
    adminId : {
        type:String,
        required:true
    }
});

const HospitalTable = new mongoose.model("HospitalTable",hospitalTableSchema);

const updateHospitalTable = async (hospitalId,adminId) =>{
    const newEntry = new HospitalTable ({
        hospitalId : hospitalId,
        adminId : adminId
    });
    await newEntry.save();
}

const deleteHospitalTable = async (hospitalId)=>{
    await HospitalTable.deleteOne({hospitalId : hospitalId});
}

module.exports = {updateHospitalTable,deleteHospitalTable};