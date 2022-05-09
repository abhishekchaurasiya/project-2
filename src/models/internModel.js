let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;


let InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        unique: true,
        required: "Mobile number is required"

    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: "College Id is required",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Intern", InternSchema);