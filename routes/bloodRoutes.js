const express = require("express");

const router =  express.Router();


router.route("/blood/camps")
    .get((req,res)=>res.render("bloodCamps"))
;

module.exports = router;