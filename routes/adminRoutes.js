const express = require("express");

// Importing custom mongoose models
const Admin = require("../models/admin.js");
const Donor = require("../models/donor.js");
const {Hospital,addHospital,deleteHospital,editHospital} = require("../models/hospital.js");

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
        res.render("admin/donors",{
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
        const aadhar = req.body.aadhar;
        const name = req.body.name.trim();
        const fname = req.body.fname.trim();
        const email = req.body.email.trim();
        const gender = req.body.gender;
        const mobile =  req.body.mobile;
        const dob = new Date(req.body.dob);
        const address = req.body.address.trim();
        const password = req.body.password.trim();
        const donor= new Donor({
            aadhar : aadhar,
            name : name,
            fname : fname,
            email : email,
            gender : gender,
            mobile : mobile,
            dob : dob,
            address : address,
            password : md5(password),
            dateOfRegistration : new Date()
        });
        try{
            await donor.save();
            res.redirect("/admin/"+adminId+"/donors");
        }
        catch(err){
            console.log(err);
        }
    })
;


module.exports = router;