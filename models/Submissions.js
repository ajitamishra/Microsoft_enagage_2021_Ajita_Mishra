const mongoose = require("mongoose");
const schema = mongoose.Schema;

// schema

const submissionSchema = new schema({
    assignment_id:{
        type: String,
    },
    subject_id:{
        type: String
    },
    path:{
        type:String
    },
    created_at:{
        type:Date
    }

});

exports.Submission = mongoose.model("submission", submissionSchema);
exports.submissionSchema = submissionSchema;