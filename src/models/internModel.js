let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let validator = require('validator');


let InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill the valid email address.',
            isAsnyc: true
        }
    },
    mobile: {
        type: Number,
        maxlength: 10,
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