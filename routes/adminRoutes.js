const express = require("express");

// Importing custom mongoose models
const Admin = require("../models/admin.js");
const {Donor,addDonor,deleteDonor,editDonor} = require("../models/donor.js");
const {Hospital,addHospital,deleteHospital,editHospital} = require("../models/hospital.js");
const {Employee,addEmployee,deleteEmployee,editEmployee} = require("../models/employee.js");
const {PendingDonation,addPendingDonation,deletePendingDonation} = require("../models/pendingDonation.js");

const router = new express.Router();


router.route("/admin/:adminId")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const admin = await Admin.findOne({_id:adminId});
        res.render("./admin/home",{
            adminName : admin.name,
            adminId : admin._id
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
            addDonor(req.body);
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
                res.redirect("/admin/"+adminId+"/donations/add/"+donor._id);
            }
            else{
                res.render("./admin/error",{
                    message : `Donor with Aadhar Number ${aadhar} does not exist! Kindly Register the Donor.`,
                    adminId : adminId
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
            res.redirect("/admin/"+adminId+"/donations");
        }
        catch(err){
            console.log(err);
        }
    })
;

router.route("/admin/:adminId/donations/:pendingDonationId/delete")
    .get(async(req,res)=>{
        const adminId = req.params.adminId;
        const pendingDonationId = req.params.pendingDonationId;
        try{
            let donor = await PendingDonation.findOne({_id:pendingDonationId});
            donor = donor.aadhar;
            donor = await Donor.findOne({aadhar : donor}); 
            await deletePendingDonation(pendingDonationId);
            res.redirect("/admin/"+adminId+"/donors/"+donor._id);
        }
        catch(err){
            console.log(err);
        }
    })
;



module.exports = router;