const mongoose = require("mongoose");
const md5 = require("md5");

const employeeSchema  = new mongoose.Schema({
    aadhar : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    jobTitle : {
        type : String,
        required : true
    },
    dateOfJoining : {
        type : Date,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const Employee = new mongoose.model("Employee",employeeSchema);

const addEmployee = async (employee) =>{
    const newEmployee = new Employee({
        aadhar : employee.aadhar,
        name : employee.name.trim(),
        email : employee.email.trim(),
        gender : employee.gender,
        mobile : employee.mobile,
        dob : employee.dob,
        address : employee.address.trim(),
        jobTitle : employee.jobTitle.trim(),
        dateOfJoining : new Date(),
        password : md5(employee.password.trim())
    });
    try{
        await newEmployee.save();
        console.log("Employee added successfully.....");
    }
    catch(err){
        console.error(err);
    }
}

const deleteEmployee = async (employeeId) => {
    try{
        await Employee.deleteOne({_id : employeeId});
        console.log("Employee Deleted Successfully....");
    }
    catch(err){
        console.error(err);
    }
}

const editEmployee = async (employeeId,employee)=>{
    try{
        await Employee.findOneAndUpdate({_id : employeeId},{
            name : employee.name.trim(),
            email : employee.email.trim(),
            gender : employee.gender,
            mobile : employee.mobile,
            dob : employee.dob,
            address : employee.address.trim(),
            jobTitle : employee.jobTitle.trim()
        })
        console.log("Employee updated successfully....");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Employee,addEmployee,deleteEmployee,editEmployee};