const md5 = require("md5");
const Admin = require("../models/admin.js");
const Donor = require("../models/donor.js");

async function authenticateUser(aadhar,password,trigger){
    if(trigger === "donor"){
        const donor = await Donor.findOne({aadhar : aadhar});
        if(donor){
            if(donor.password === md5(password)){
                return {
                    user : donor,
                    msg : `Welcome ${donor.name}, to the Blood Bank`
                }
            }
            else{
                return {
                    user:null,
                    msg : `Incorrect password for ${donor.name}.`
                }
            }
        }
        else{
            return {
                user : null,
                msg : `Donor with Aadhar number ${aadhar} not found.`
            }
        }
    }
    else if(trigger === "employee"){
        return null;
    }
    else if(trigger === "admin"){
        const admin = await Admin.findOne({aadhar : aadhar});
        if(admin){
            if(admin.password === password){
                return {
                    user : admin,
                    msg : `Welcome Admin ${admin.name}, to the Blood Bank`
                }
            }
            else{
                return {
                    user : null,
                    msg : `Incorrect password for ${admin.name}.`
                }
            }
        }
        else{
            return {
                user : null,
                msg : `Admin with Aadhar Number ${aadhar} not found`
            }
        }
    }
    else{
        return {
            user : null,
            msg : `Invalid trigger(Button value)`
        }
    }
}

module.exports = authenticateUser;