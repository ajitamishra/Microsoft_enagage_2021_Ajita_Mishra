const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {submissionSchema} = require("./Submissions");

// schema

const userSchema = new schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        required:true
    },
    subjects:{
        type:Array
    },
    submissions: [submissionSchema]
});

module.exports = User = mongoose.model("users", userSchema);