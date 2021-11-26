const mongoose = require("mongoose");
const schema = mongoose.Schema;

// schema

const assignmentSchema = new schema({
    assignment_id:{
        type: String,
    },
    title:{
        type:String
    },
    path:{
        type:String
    },
    created_at:{
        type:Date
    },
    instruction:{
        type:String
    }

});

exports.Assignment = mongoose.model("assignment", assignmentSchema);
exports.assignmentSchema = assignmentSchema;