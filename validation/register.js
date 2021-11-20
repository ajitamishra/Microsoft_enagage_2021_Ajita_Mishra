const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // converting empty fields to empty strings as validator works only on empty strings
    data.name = !isEmpty(data.name) ? data.name : "";
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.role = !isEmpty(data.role) ? data.role : "";

    if(validator.isEmpty(data.name))
        errors.name = "Name is required.";
    if(validator.isEmpty(data.userId))
        errors.userId = "Id is required.";
    if(validator.isEmpty(data.role))
        errors.userId = "Role is required.";
    if(validator.isEmpty(data.email))
        errors.email = "Email is required.";
    else if(!validator.isEmail(data.email))
        errors.email = "Invalid Email."
    if(validator.isEmpty(data.password))
        errors.password = "Password is required.";
    if(validator.isEmpty(data.password2))
        errors.password2 = "Re-enter your password.";
    if(!validator.isLength(data.password, { min: 6, max: 30 }))
        errors.password = "Password must have atleast 6 characters."
    if(!validator.equals(data.password, data.password2))
        errors.password2 = "Passwords don't match.";

    return {
        errors, isValid: isEmpty(errors)
    };
};