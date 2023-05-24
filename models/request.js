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

const allocationRecord = async(rAadhar,name,dAadhar,hospitalId,component,group,rh)=>{
    const newAllocation = new Allocation({
        allocationDate : new Date(),
        recipientAadhar : rAadhar,
        recipientName : name,
        donorAadhar : dAadhar,
        hospitalId : hospitalId,
        component : component,
        group : group,
        rh : rh
    });
    await newAllocation.save();
}

const allocation = async (components,request)=>{
    let allocatedId = null;
    for(let i=0;i<components.length;i++){
        if(components[i].group === request.group && components[i].rh===request.rh){
            allocatedId = components[i]._id;
            await allocationRecord(request.aadhar,request.name,components[i].aadhar,request.hospitalId,request.component,components[i].group,components[i].rh);
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

const manualAllocate = async(request,componentId)=>{
    let component = null;
    let allocated = false;
    if(request.component === "PLASMA"){
        component = await Plasma.findOne({_id:componentId});
        await allocationRecord(request.aadhar,request.name,component.aadhar,request.hospitalId,request.component,component.group,component.rh);
        await Plasma.deleteOne({_id : component._id});
        allocated = true;
    }
    else if(request.component==="PLATELET"){
        component = await Platelet.findOne({_id:componentId});
        await allocationRecord(request.aadhar,request.name,component.aadhar,request.hospitalId,request.component,component.group,component.rh);
        await Platelet.deleteOne({_id : component._id});
        allocated = true;
    }
    else if(request.component === "RBC"){
        component = await RedBlood.findOne({_id:componentId});
        await allocationRecord(request.aadhar,request.name,component.aadhar,request.hospitalId,request.component,component.group,component.rh);
        await RedBlood.deleteOne({_id : component._id});
        allocated = true;
    }
    else{
        component = await Blood.findOne({_id:componentId});
        await allocationRecord(request.aadhar,request.name,component.aadhar,request.hospitalId,request.component,component.group,component.rh);
        await Blood.deleteOne({_id : component._id});
        allocated = true;
    }
    return allocated;
}

module.exports = {Request,allocate,manualAllocate,Allocation};