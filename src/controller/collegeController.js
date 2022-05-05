const collegeModle = require("../models/collegeModel");



let collegeName = async function (req, res) {

    try {
        let requestBody = req.body;
        let { name, fullName, logoLink, isDeleted } = requestBody;


        let collegeData = { name, fullName, logoLink, isDeleted };
        let createCollegeDetails = await collegeModle.create(collegeData)

        res.status(201).send({ status: true, message: "College created successfully", data: createCollegeDetails })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { collegeName }