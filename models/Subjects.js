const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {assignmentSchema} = require("./Assignment");
// schema
/*
{
    "subject_id":"CS101",
    "title":"Natural Language Processing",
    teachers":["UT32"],
}
*/

const subjectSchema = new schema({
    subject_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    teachers:{
    type: Array
    },
    assignments: [assignmentSchema]
});

module.exports = subject = mongoose.model("subjects", subjectSchema);