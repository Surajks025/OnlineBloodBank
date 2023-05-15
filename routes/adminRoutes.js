const express = require("express");

// Importing custom mongoose models
const Admin = require("../models/admin.js");
const {Donor,addDonor,deleteDonor,editDonor} = require("../models/donor.js");
const {Hospital,addHospital,deleteHospital,editHospital} = require("../models/hospital.js");
const {Employee,addEmployee,deleteEmployee,editEmployee} = require("../models/employee.js");
const {PendingDonation,addPendingDonation,deletePendingDonation} = require("../models/pendingDonation.js");
const {Report,createReport } = require("../models/report.js");
const {VerifiedDonation} = require("../models/verifiedDonation.js");
const {getPlasma,getPlasmaCount,getPlatelets,getPlateletCount,getBlood,getBloodCount,getRedBlood,getRedBloodCount} = require("../models/bloodComponents.js");
const {Request,allocate} = require("../models/request.js");

const router = new express.Router();


router.route("/admin/:adminId")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const admin = await Admin.findOne({_id:adminId});
        let countPlasmas = await getPlasmaCount();
        let countRBC = await getRedBloodCount();
        let countPlatelets = await getPlateletCount();
        let countBloods = await getBloodCount();
        res.render("./admin/home",{
            adminName : admin.name,
            adminId : admin._id,
            countPlasmas:countPlasmas,
            countRBCs : countRBC,
            countPlatelets : countPlatelets,
            countBloods : countBloods
        })
    })
;

router.route("/admin/:adminId/about")
    .get((req,res)=>{
        const adminId = req.params.adminId;
        res.render("./admin/about",{
            adminId : adminId
        });
    })
;

router.route("/admin/:adminId/hospitals")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        try{
            const hospitals = await Hospital.find();
            res.render("./admin/hospitals",{
                hospitals:hospitals,
                adminId : adminId
            })
        }
        catch(err){
            console.log("Error in finding Hospitals.....");
        }
    })
;

router.route("/admin/:adminId/hospitals/register")
    .get((req,res)=>{
        const adminId = req.params.adminId;
        res.render("./admin/addHospital",{
            adminId : adminId
        })
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        try{
            await addHospital(req.body,adminId);
            res.redirect("/admin/"+adminId+"/hospitals")
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/hospitals/:hospitalId")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const hospitalId = req.params.hospitalId;
        try{
            const hospital = await Hospital.findOne({_id : hospitalId});
            res.render("./admin/hospital",{
                adminId : adminId,
                hospital : hospital
            })
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/hospitals/:hospitalId/delete")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const hospitalId = req.params.hospitalId;
        try{
            await deleteHospital(hospitalId);
            res.redirect("/admin/"+adminId+"/hospitals");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/hospitals/:hospitalId/edit")
    .get(async (req,res)=>{
        const hospitalId = req.params.hospitalId;
        const adminId = req.params.adminId;
        try{
            const hospital = await Hospital.findOne({_id : hospitalId});
            res.render("./admin/editHospital",{
                adminId : adminId,
                hospital : hospital
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async (req,res)=>{
        const hospitalId = req.params.hospitalId;
        const adminId = req.params.adminId;
        try{
            await editHospital(hospitalId,req.body);
            res.redirect("/admin/"+adminId+"/hospitals");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/donors")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const donors = await Donor.find();
        res.render("./admin/donors",{
            donors:donors,
            adminId : adminId
        })
    })
;

router.route("/admin/:adminId/donors/register")
    .get((req,res)=>{
        const adminId = req.params.adminId;
        res.render("./admin/addDonor",{
            adminId : adminId
        })
    })
    .post( async (req,res)=>{
        const adminId = req.params.adminId;
        try{
            await addDonor(req.body);
            res.redirect("/admin/"+adminId+"/donors");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/donors/:donorId")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            const donor = await Donor.findOne({_id : donorId});
            res.render("./admin/donor",{
                donor : donor,
                adminId : adminId
            })
        }
        catch(err){
            console.log("Could not find the specified Donor...")
        }
    })
;

router.route("/admin/:adminId/donors/:donorId/delete")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            await deleteDonor(donorId);
            res.redirect("/admin/"+adminId+"/donors");
        }
        catch(err){
            console.log("Specified Donor could not be deleted  .....");
        }
    })
;

router.route("/admin/:adminId/donors/:donorId/edit")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            const donor = await Donor.findOne({_id : donorId});
            res.render("./admin/editDonor",{
                adminId : adminId,
                donor : donor
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            await editDonor(donorId,req.body);
            res.redirect("/admin/"+adminId+"/donors");
        }
        catch(err){
            console.log("Donor could not be edited....");
        }
    })
;

router.route("/admin/:adminId/employees")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const employees = await Employee.find();
        res.render("./admin/employees",{
            adminId : adminId,
            employees : employees
        });
    })
;

router.route("/admin/:adminId/employees/register")
    .get((req,res)=>{
        const adminId = req.params.adminId;
        res.render("./admin/addEmployee",{
            adminId : adminId
        })
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        try{
            await addEmployee(req.body);
            res.redirect("/admin/"+adminId+"/employees");
        }
        catch(err){
            console.log("Employee could not be added....");
        }
    })
;

router.route("/admin/:adminId/employees/:employeeId")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const employeeId = req.params.employeeId;
        try{
            const employee = await Employee.findOne({_id : employeeId});
            res.render("./admin/employee",{
                adminId : adminId,
                employee : employee
            });
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/employees/:employeeId/delete")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const employeeId = req.params.employeeId;
        try{
            await deleteEmployee(employeeId);
            res.redirect("/admin/"+adminId+"/employees");
        }
        catch(err){
            console.log("Specified employee Could not be deleted .....");
        }
    })
;

router.route("/admin/:adminId/employees/:employeeId/edit")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const employeeId = req.params.employeeId;
        try{
            const employee = await Employee.findOne({_id:employeeId});
            res.render("./admin/editEmployee",{
                adminId : adminId,
                employee : employee
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        const employeeId = req.params.employeeId;
        try{
            await editEmployee(employeeId,req.body);
            res.redirect("/admin/"+adminId+"/employees");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/pendingDonations")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        try{
            const pendingDonations = await PendingDonation.find();
            const donors= [];
            for(let i=0;i<pendingDonations.length;i++){
                const donor = await Donor.findOne({aadhar : pendingDonations[i].aadhar});
                donors.push(donor);
            }
            res.render("./admin/pendingDonations",{
                adminId : adminId,
                donors : donors,
                donations : pendingDonations
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async(req,res)=>{
        const adminId =  req.params.adminId;
        const aadhar = req.body.aadhar;
        try{
            const donor = await Donor.findOne({aadhar : aadhar});
            if(donor){
                const report = await Report.find({aadhar : aadhar});
                let lastDonationDate = new Date().getTime(); 
                lastDonationDate -= report[report.length-1].donationDate.getTime();
                if(lastDonationDate<=7889400000){
                    res.render("./admin/error",{
                        adminId : adminId,
                        message : `Donor with Aadhar Number ${aadhar} has donated blood on ${report[report.length-1].donationDate.getDate()+"/"+(report[report.length-1].donationDate.getMonth()+1)+"/"+report[report.length-1].donationDate.getFullYear()} and cannot donate within 3 months of previous Donation.`,
                        link : "/admin/"+adminId+"/pendingDonations",
                        btnText : "Pending Donation"
                    })
                }
                else{
                    res.redirect("/admin/"+adminId+"/donations/add/"+donor._id);
                }
            }
            else{
                res.render("./admin/error",{
                    message : `Donor with Aadhar Number ${aadhar} does not exist ! Kindly Register the Donor.`,
                    adminId : adminId,
                    link : "/admin/"+adminId+"/donors/register",
                    btnText : "+ Register Donor"
                })
            }
        }
        catch(err){
            console.log(err);
        }
    })
;


router.route("/admin/:adminId/donations/add/:donorId")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            const donor = await Donor.findOne({_id : donorId});
            res.render("./admin/addPendingDonation",{
                adminId : adminId,
                donor : donor
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        const donorId = req.params.donorId;
        try{
            const donor = await Donor.findOne({_id:donorId});
            await addPendingDonation(donor.aadhar,req.body);
            res.redirect("/admin/"+adminId+"/pendingDonations");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/reports/add/:pendingDonationId")
    .get(async (req,res)=>{
        const pendingDonationId = req.params.pendingDonationId;
        const adminId = req.params.adminId;
        try{
            const pendingDonation = await PendingDonation.findOne({_id : pendingDonationId});
            const donor = await Donor.findOne({aadhar : pendingDonation.aadhar});
            res.render("./admin/generateReport",{
                adminId : adminId,
                donor : donor,
                donation : pendingDonation
            })
        }
        catch(err){
            console.log(err);
        }
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        const pendingDonationId = req.params.pendingDonationId;
        try{
           const pendingDonation = await PendingDonation.findOne({_id : pendingDonationId});
           await createReport(req.body,pendingDonation);
           await deletePendingDonation(pendingDonationId);
           res.redirect("/admin/"+adminId+"/verifiedDonations");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/verifiedDonations")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        try{
            const donations = await VerifiedDonation.find();
            res.render("./admin/verifiedDonations",{
                adminId : adminId,
                donations : donations
            });
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/reports/:reportId")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const reportId = req.params.reportId;
        try{
            const report = await Report.findOne({_id:reportId});
            const donorId = report.aadhar;
            const donor = await Donor.findOne({aadhar : donorId});
            res.render("./admin/report",{
                donor:donor,
                report:report,
                adminId : adminId
            })
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/inventory")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        try{
            let plasmas = await getPlasma();
            let redBloods = await getRedBlood();
            let platelets = await getPlatelets();
            let bloods = await getBlood();
            let countPlasmas = await getPlasmaCount();
            let countRBC = await getRedBloodCount();
            let countPlatelets = await getPlateletCount();
            let countBloods = await getBloodCount();
            res.render("./admin/bloodInventory",{
                countPlasmas:countPlasmas,
                countRBCs : countRBC,
                countPlatelets : countPlatelets,
                countBloods : countBloods,
                plasmas:plasmas,
                redBloods : redBloods,
                platelets : platelets,
                bloods : bloods,
                adminId : adminId
            })
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/requests")
    .get(async (req,res)=>{
        const adminId = req.params.adminId;
        const requests = await Request.find();
        res.render("./admin/requests",{
            adminId : adminId,
            requests : requests
        })
    })
;

router.route("/admin/:adminId/requests/:requestId")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const requestId = req.params.requestId;
        const request = await Request.findOne({_id:requestId});
        if(request){
            const allocated = await allocate(request);
            if(allocated === true){
                await Request.deleteOne({_id:request._id});
                res.redirect("/admin/"+adminId+"/requests");
            }
            else{
                res.render("./admin/error",{
                    adminId : adminId,
                    message : "Blood is not available for the specified request.",
                    link : "/admin/"+adminId+"/requests",
                    btnText : "Blood Requests"
                })
            }
        }
        else{
            res.render("./admin/error",{
                adminId : adminId,
                message : "Invalid Request",
                link : "/admin/"+adminId+"/requests",
                btnText : "Blood Requests"
            })
        }
    })
;

router.route("/admin/:adminId/requests/create")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const hospitals = await Hospital.find();
        res.render("./admin/createRequest",{
            adminId : adminId,
            hospitals : hospitals
        })
    })
    .post(async(req,res)=>{
        const adminId = req.params.adminId;
        const newRequest = new Request({
            aadhar : req.body.aadhar,
            name : req.body.name,
            requestDate : new Date(),
            component : req.body.component,
            group : req.body.group,
            rh : req.body.rh,
            hospitalId : req.body.hospital
        });
        await newRequest.save();
        res.redirect("/admin/"+adminId+"/requests");
    })
;

module.exports = router;