const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

//Importing connectDB
const connectDB=require("./connectDB.js");

//Importing login authenticator from authenticate/login.js
const authenticateUser=require("./auth/login.js");

//Importing Routes
const adminRoutes = require("./routes/adminRoutes.js");
const donorRoutes = require("./routes/donorRoutes.js");
const bloodRoutes = require("./routes/bloodRoutes.js");

// Importing Donor model
const Donor = require("./models/donor.js");

//creating app
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");

//use imported routes
app.use(adminRoutes);
app.use(donorRoutes);
app.use(bloodRoutes);


// Connecting to the DB
connectDB()
    .then((status)=>{
    console.log(status);
    })
;

app.route("/")
    .get((req,res)=>res.render("./landing/home"))
;

app.route("/about")
    .get((req,res)=>res.render("./landing/about"))
;

app.route("/hospitals")
    .get((req,res)=>res.render("./landing/hospitals"))
;

app.route("/bloodCamps")
    .get((req,res)=>res.render("./landing/bloodCamps"))
;

app.route("/login")
    .get((req,res)=>res.render("./landing/login"))
    .post(async (req,res)=>{
        const aadhar = req.body.aadhar.trim();
        const password = req.body.password.trim();
        const trigger  = req.body.btn;
        const approval = await authenticateUser(aadhar,password,trigger);
        if(approval.user){
            if(trigger === "admin"){
                res.render("./admin/home",{
                    adminName : approval.user.name,
                    adminId : approval.user._id,
                });
            }
            else if(trigger === "donor"){
                res.render("donor",{
                    donor : approval.user,
                    role : trigger
                })
            }
            else if(trigger === "employee"){
                res.render("employee",{
                    employee : approval.user,
                    role : trigger
                })
            }
        }
        else{
            console.log(approval.msg);
        }
    })
;

app.route("/register")
    .get((req,res)=>res.render("./landing/registerDonor"))
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


app.listen("3000",()=>console.log("Server has started and listening on PORT 3000"));