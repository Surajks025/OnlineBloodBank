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

const getPlasma = async ()=>{
    const today = new Date().getTime();
    let plasmas = await Plasma.find();
    for(let i=0;i<plasmas.length;i++){
        let expDate = plasmas[i].expiryDate.getTime();
        if(today>expDate){
            await deleteBloodComponent("PLASMA",plasmas[i]._id);
        }
    }
    plasmas = await Plasma.find();
    return plasmas;
}

const getPlasmaCount = async ()=>{
    let plasmaCount = [0,0,0,0,0,0,0,0];
    let plasmas = await getPlasma();
    for(let i=0;i<plasmas.length;i++){
        if(plasmas[i].group==="O"){
            if(plasmas[i].rh==="-"){
                plasmaCount[0]++;
            }
            else if(plasmas[i].rh==="+"){
                plasmaCount[1]++;
            }
        }
        else if(plasmas[i].group==="B"){
            if(plasmas[i].rh==="-"){
                plasmaCount[2]++;
            }
            else if(plasmas[i].rh==="+"){
                plasmaCount[3]++;
            }
        }
        else if(plasmas[i].group==="A"){
            if(plasmas[i].rh==="-"){
                plasmaCount[4]++;
            }
            else if(plasmas[i].rh==="+"){
                plasmaCount[5]++;
            }
        }
        else if(plasmas[i].group==="AB"){
            if(plasmas[i].rh==="-"){
                plasmaCount[6]++;
            }
            else if(plasmas[i].rh==="+"){
                plasmaCount[7]++;
            }
        }
    }
    return plasmaCount;
}

const getPlatelets = async()=>{
    const today = new Date().getTime();
    let platelets = await Platelet.find();
    for(let i=0;i<platelets.length;i++){
        let expDate = platelets[i].expiryDate.getTime();
        if(today>expDate){
            await deleteBloodComponent("PLATELET",platelets[i]._id);
        }
    }
    platelets = await Platelet.find();
    return platelets;
}

const getPlateletCount = async ()=>{
    let plateletCount = [0,0,0,0,0,0,0,0];
    let platelets = await getPlatelets();
    for(let i=0;i<platelets.length;i++){
        if(platelets[i].group==="O"){
            if(platelets[i].rh==="-"){
                plateletCount[0]++;
            }
            else if(platelets[i].rh==="+"){
                plateletCount[1]++;
            }
        }
        else if(platelets[i].group==="B"){
            if(platelets[i].rh==="-"){
                plateletCount[2]++;
            }
            else if(platelets[i].rh==="+"){
                plateletCount[3]++;
            }
        }
        else if(platelets[i].group==="A"){
            if(platelets[i].rh==="-"){
                plateletCount[4]++;
            }
            else if(platelets[i].rh==="+"){
                plateletCount[5]++;
            }
        }
        else if(platelets[i].group==="AB"){
            if(platelets[i].rh==="-"){
                plateletCount[6]++;
            }
            else if(platelets[i].rh==="+"){
                plateletCount[7]++;
            }
        }
    }
    return plateletCount;
}

const getBlood = async()=>{
    const today = new Date().getTime();
    let bloods = await Blood.find();
    for(let i=0;i<bloods.length;i++){
        let expDate = bloods[i].expiryDate.getTime();
        if(today>expDate){
            await deleteBloodComponent("BLOOD",bloods[i]._id);
        }
    }
    bloods = await Blood.find();
    return bloods;
}

const getBloodCount = async ()=>{
    let bloodCount = [0,0,0,0,0,0,0,0];
    let bloods = await getBlood();
    for(let i=0;i<bloods.length;i++){
        if(bloods[i].group==="O"){
            if(bloods[i].rh==="-"){
                bloodCount[0]++;
            }
            else if(bloods[i].rh==="+"){
                bloodCount[1]++;
            }
        }
        else if(bloods[i].group==="B"){
            if(bloods[i].rh==="-"){
                bloodCount[2]++;
            }
            else if(bloods[i].rh==="+"){
                bloodCount[3]++;
            }
        }
        else if(bloods[i].group==="A"){
            if(bloods[i].rh==="-"){
                bloodCount[4]++;
            }
            else if(bloods[i].rh==="+"){
                bloodCount[5]++;
            }
        }
        else if(bloods[i].group==="AB"){
            if(bloods[i].rh==="-"){
                bloodCount[6]++;
            }
            else if(bloods[i].rh==="+"){
                bloodCount[7]++;
            }
        }
    }
    return bloodCount;
}

const getRedBlood = async()=>{
    const today = new Date().getTime();
    let redBloods = await RedBlood.find();
    for(let i=0;i<redBloods.length;i++){
        let expDate = redBloods[i].expiryDate.getTime();
        if(today>expDate){
            await deleteBloodComponent("REDBLOOD",redBloods[i]._id);
        }
    }
    redBloods=await RedBlood.find();
    return redBloods;
}

const getRedBloodCount = async ()=>{
    let redBloodCount = [0,0,0,0,0,0,0,0];
    let redBloods = await getRedBlood();
    for(let i=0;i<redBloods.length;i++){
        if(redBloods[i].group==="O"){
            if(redBloods[i].rh==="-"){
                redBloodCount[0]++;
            }
            else if(redBloods[i].rh==="+"){
                redBloodCount[1]++;
            }
        }
        else if(redBloods[i].group==="B"){
            if(redBloods[i].rh==="-"){
                redBloodCount[2]++;
            }
            else if(redBloods[i].rh==="+"){
                redBloodCount[3]++;
            }
        }
        else if(redBloods[i].group==="A"){
            if(redBloods[i].rh==="-"){
                redBloodCount[4]++;
            }
            else if(redBloods[i].rh==="+"){
                redBloodCount[5]++;
            }
        }
        else if(redBloods[i].group==="AB"){
            if(redBloods[i].rh==="-"){
                redBloodCount[6]++;
            }
            else if(redBloods[i].rh==="+"){
                redBloodCount[7]++;
            }
        }
    }
    return redBloodCount;
}

module.exports = {Blood,Plasma,Platelet,RedBlood,componentize,getPlasma,getPlasmaCount,getPlatelets,getPlateletCount,getBlood,getBloodCount,getRedBlood,getRedBloodCount};