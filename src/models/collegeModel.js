let mongoose = require('mongoose');
let validator = require('validator');


let CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: "Name is required"
    },
    fullName: {
        type: String,
        required: "Full name is required"
    },
    logoLink: {
        type: String,
        trim: true,
        required: "Link is required"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("College", CollegeSchema);  