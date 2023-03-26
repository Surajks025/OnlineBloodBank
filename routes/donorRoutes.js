const express = require("express");
const md5 = require("md5");
const router = express.Router();

// Importing custom mongoose models
const Donor = require("../models/donor.js");

router.route("/donor/register")
    .get((req,res)=>{
        res.render("registerDonor");
    })
    .post( async (req,res)=>{
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
            res.redirect("/login");
        }
        catch(err){
            console.log(err);
        }
    })
;

module.exports = router;