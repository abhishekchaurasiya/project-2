const express = require('express');

const router = express.Router();


const { collegeName } = require('../controller/collegeController');


router.post("/functionup/colleges", collegeName)










module.exports = router;