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
            res.status(400).send({ status: false, message: "Invalid request parameter. Please provide college details" });
            return;
        }

        // Extract in object
        let { name, fullName, logoLink } = requestBody;

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

        if ((/\d/).test(name)) {
            res.status(400).send({ status: false, message: "Please provide valid string" })
            return
        }

        if (!(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(logoLink)) {
            res.status(400).send({ status: false, message: "Please provide valid link" })
            return
        };


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

        // Allready link is store
        let validLogoLink = await collegeModle.findOne({ logoLink });
        if (validLogoLink) {
            res.status(400).send({ status: false, message: "Please provide valid URL." })
            return
        }
        // Validation is ends


        let collegeData = { name, fullName, logoLink };
        let createCollegeDetails = await collegeModle.create(collegeData)

        if (!createCollegeDetails) {
            res.status(400).send({ status: false, message: "Please inter the valid college details" });
            return;
        }

        res.status(201).send({ status: true, message: "College created successfully", data: createCollegeDetails })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { collegeName }