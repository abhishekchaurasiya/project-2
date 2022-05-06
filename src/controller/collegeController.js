const collegeModle = require("../models/collegeModel");


let isValidData = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

let isValidRequestBodyData = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

let collegeName = async function (req, res) {

    try {
        let requestBody = req.body;

        // Here is validation is start

        if (!isValidRequestBodyData(requestBody)) {
            res.status(400).send({ status: false, message: "Invalid request parameter. Please provide author details" });
            return;
        }

        let { name, fullName, logoLink, isDeleted } = requestBody;

        if (!isValidData(name)) {
            res.status(400).send({ status: false, message: "Name is required." });
            return;
        }
        if (!isValidData(fullName)) {
            res.status(400).send({ status: false, message: "Fullname is required." });
            return;
        }
        if (!isValidData(logoLink)) {
            res.status(400).send({ status: false, message: "Logo link is required." });
            return;
        }
        if (!isValidData(isDeleted)) {
            res.status(400).send({ status: false, message: "Is deleted is required." });
            return;
        }

        let nameAllReadyUsed = await collegeModle.findOne({ name });
        if (nameAllReadyUsed) {
            res.status(400).send({ status: false, message: `Try another name because this name ${name} is already used.` });
            return;
        };

        let fullNameAllReadyUsed = await collegeModle.findOne({ fullName });
        if (fullNameAllReadyUsed) {
            res.status(400).send({ status: false, message: `Try another name because this name ${fullName} is already used.` });
            return;
        };

        let validLogoLink = await collegeModle.findOne({ logoLink });
        if (validLogoLink) {
            res.status(400).send({ status: false, message: "Please provide valid URL." })
            return
        }
        // Validation is ends


        let collegeData = { name, fullName, logoLink, isDeleted };
        let createCollegeDetails = await collegeModle.create(collegeData)

        if (!createCollegeDetails) {
            res.status(400).send({ status: false, message: "" });
            return;
        }
        
        res.status(201).send({ status: true, message: "College created successfully", data: createCollegeDetails })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { collegeName }