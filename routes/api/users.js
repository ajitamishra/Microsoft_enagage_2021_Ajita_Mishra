const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        userId: req.body.userId,
    }).then(user => {
        if(user) {
            return res.status(400).json({ userId: "User Id already exists." });
        } 
        else {
            const newUser = new User({
                name: req.body.name,
                userId: req.body.userId,
                email: req.body.email,
                password: req.body.password,
                role:req.body.role
            });

            // hashing password before saving
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if(error) throw error;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(error => console.log(error));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const userId = req.body.userId;
    const password = req.body.password;
    const role = req.body.role;

    User.findOne({ userId }).then(user => {
        if(!user) {
            return res.status(404).json({ userIdNotFound: "User Id not found." });
        }
        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                // user matched, create jwt payload
                const payload = {
                    id: user.id, 
                    name: user.name,
                    role:user.role,
                };

                // sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 1800   // 30 mins in seconds
                    },
                    (error, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            }
            else {
                return res.status(400).json({ incorrectPassword: "Incorrect Password." });
            }
        });
    });
});

module.exports = router;