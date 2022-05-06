const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


// This is all validation function and start is here
let isValidRequestBodyData = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidInterData = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidObjectId = function (objectId) {
    return ObjectId.isValidInterData(objectId)
}
// Here Ends

const internDetails = async function (req, res) {

    try {

        let requestBody = req.body;

        if (!isValidRequestBodyData(requestBody)) {
            res.status(400).send({ status: false, message: "Invalid request parameter. Please provide intern details" });
            return;
        }

        let { name, mobile, email, collegeName } = requestBody;

        // Validation is start 

        if (!isValidInterData(name)) {
            res.status(400).send({ status: false, message: "Name is required." });
            return;
        };

        if (!isValidInterData(mobile)) {
            res.status(400).send({ status: false, message: "Mobile is required." });
            return;
        };

        if (!isValidInterData(email)) {
            res.status(400).send({ status: false, message: "Email is required." });
            return;
        };

        if (!isValidInterData(collegeName)) {
            res.status(400).send({ status: false, message: "Colllege name is required." });
            return;
        };

        if (!/^\d{10}$/.test(mobile)) {
            res.status(400).send({ status: false, message: "Please provide valid mobile number" });
            return;
        }

        let isMobilelUsed = await internModel.findOne({ mobile });
        if (isMobilelUsed) {
            res.status(400).send({ status: false, message: `Try another mobile number ${isMobilelUsed["mobile"]} is already used.` });
            return;
        };

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            res.status(400).send({ status: false, message: "Please provide valid email" })
            return
        };

        let isEmailUsed = await internModel.findOne({ email });
        if (isEmailUsed) {
            res.status(400).send({ status: false, message: `Try another email ${isEmailUsed["email"]} is already used.` });
            return;
        };

        let validCollege = await collegeModel.findOne({ name: collegeName });
        if (!validCollege) return res.status(404).send({ status: false, message: 'College name not found' });

        delete requestBody["collegeName"];  // here delete collegeName 
        requestBody["collegeId"] = validCollege._id;

        let data = await internModel.create(requestBody);
        res.status(201).send({ status: true, message: "Intern is created", data: data })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
};


let getInternDetails = async function (req, res) {

    try {
        let collegeName = req.query.collegeName;   // variable name collegeName es liye hai because collegeName present in query

        if (!isValidInterData(collegeName)) {
            res.status(400).send({ status: false, message: 'kindly input the query parameter' });
            return;
        }

        let allFilterData = {};

        let findCollegeData = await collegeModel.findOne({ name: collegeName });
        if (!findCollegeData) {
            return res.status(404).send({ status: false, message: 'college has not been registered yet' })
        };

        allFilterData["name"] = findCollegeData["name"];
        allFilterData["fullName"] = findCollegeData["fullName"];
        allFilterData["logoLink"] = findCollegeData["logoLink"];

        let findIntern = await internModel.find({ collegeId: findCollegeData }).select({ name: true, email: true, mobile: true });  // FindOut collegeId in collegeModel

        if (findIntern.length === 0) {
            res.status(404).send({ status: false, message: `No students have applied for internship from ${collegeName} college` });
            return;
        }

        allFilterData["interest"] = findIntern; // Here create a new Object key

        res.status(200).send({ status: true, message: "All intern present with college details", data: allFilterData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}





module.exports = { internDetails, getInternDetails }