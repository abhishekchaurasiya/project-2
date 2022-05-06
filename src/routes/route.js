const express = require('express');

const router = express.Router();


const { collegeName } = require('../controller/collegeController');
const { internDetails , getInternDetails} = require("../controller/internController")


router.post("/functionup/colleges", collegeName);

router.post("/functionup/interns", internDetails);

router.get("/functionup/collegeDetails", getInternDetails)










module.exports = router;