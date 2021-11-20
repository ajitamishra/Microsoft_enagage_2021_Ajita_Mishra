const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    

    if(validator.isEmpty(data.userId))
        errors.userId = "Id is required.";
    if(validator.isEmpty(data.password))
        errors.password = "Password is required.";
    if(validator.isEmpty(data.role))
        errors.role = "Role is required.";

    return {
        errors, isValid: isEmpty(errors)
    };
};