const mongoose = require("mongoose");
const {Blood,Plasma,Platelet,RedBlood,getPlasma,getPlatelets,getRedBlood,getBlood} = require("./bloodComponents.js");

const requestSchema = new mongoose.Schema({
    aadhar : {
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    requestDate :{
        type : Date,
        required : true
    },
    component : {
        type : String,
        required : true
    },
    group : {
        type : String,
        required : true
    },
    rh : {
        type:String,
        required : true
    },
    hospitalId : {
        type : String,
        required : true
    }
});

const allocationSchema = new mongoose.Schema({
    allocationDate:{
        type:Date,
        required : true
    },
    recipientAadhar:{
        type:String,
        required:true
    },
    recipientName : {
        type : String,
        required : true
    },
    donorAadhar:{
        type:String,
        required:true
    },
    hospitalId:{
        type : String,
        required :true
    },
    component : {
        type :String,
        required :true
    },
    group : {
        type:String,
        required:true
    },
    rh:{
        type:String,
        required :true
    }
});

const Allocation = new mongoose.model("Allocation",allocationSchema);

const Request = new mongoose.model("Request",requestSchema);

const allocation = async (components,request)=>{
    let allocatedId = null;
    for(let i=0;i<components.length;i++){
        if(components[i].group === request.group && components[i].rh===request.rh){
            allocatedId = components[i]._id;
            const newAllocation = new Allocation({
                allocationDate : new Date(),
                recipientAadhar : request.aadhar,
                recipientName : request.name,
                donorAadhar : components[i].aadhar,
                hospitalId : request.hospitalId,
                component : request.component,
                group : components[i].group,
                rh : components[i].rh
            });
            await newAllocation.save();
            break;
        }
    }
    return allocatedId;
}

const allocate = async (request)=>{
    let allocated = false;
    if(request.component === "PLASMA"){
        const plasmas = await getPlasma();
        const allocatedId = await allocation(plasmas,request);
        if(allocatedId){
            allocated = true;
            await Plasma.deleteOne({_id:allocatedId});
        }
    }
    else if(request.component === "PLATELET"){
        const platelets = await getPlatelets();
        const allocatedId = await allocation(platelets,request);
        if(allocatedId){
            allocated = true;
            await Platelet.deleteOne({_id:allocatedId});
        }
    }
    else if(request.component === "RBC"){
        const rbc = await getRedBlood();
        const allocatedId = await allocation(rbc,request);
        if(allocatedId){
            allocated = true;
            await RedBlood.deleteOne({_id:allocatedId});
        }
    }
    if(allocated === false){
        const bloods = await getBlood();
        const allocatedId = await allocation(bloods,request);
        if(allocatedId){
            allocated = true;
            await Blood.deleteOne({_id:allocatedId});
        }
    }
    return allocated;
}

module.exports = {Request,allocate};