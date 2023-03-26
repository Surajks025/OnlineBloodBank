const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/bloodBankDB",{useNewUrlParser:true});
        return "The server has successfully connected to the Database :)";
    }
    catch(err){
        return err;
    }
}

module.exports = connectDB;