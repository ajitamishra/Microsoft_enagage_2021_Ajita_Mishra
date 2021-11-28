const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

// load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load model
const User = require("../../models/Users");
const { Submission } = require("../../models/Submissions");
const Subject = require("../../models/Subjects");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    userId: req.body.userId,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ userId: "User Id already exists." });
    } else {
      const newUser = new User({
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      // hashing password before saving
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((error) => console.log(error));
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
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.body.userId;
  const password = req.body.password;
  const role = req.body.role;

  User.findOne({ userId }).then((user) => {
    if (!user) {
      return res.status(404).json({ userIdNotFound: "User Id not found." });
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched, create jwt payload
        const payload = {
          id: user.id,
          userId: user.userId,
          name: user.name,
          role: user.role,
        };

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 1800, // 30 mins in seconds
          },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ incorrectPassword: "Incorrect Password." });
      }
    });
  });
});

router.post("/submit-assignment", async (req, res) => {
  // const {userId,formData}=req.body;

  const form = new formidable.IncomingForm();
  const rootFolder = path.join(__dirname, "../");
  form.parse(req, async function (err, _fields, files) {
    if (err) {
      res.status(500).json({
        message: "File upload unsuccessful",
      });
    } else {
      const oldPath = files.file.filepath;
      const newPath = path.join(
        rootFolder,
        "upload",
        files.file.originalFilename
      );
      const {userId,subjectId,assignmentId}=(_fields);
      const readStream = fs.createReadStream(oldPath);
      const writeStream = fs.createWriteStream(path.join(newPath));
      readStream.pipe(writeStream);

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const newSubmission = new Submission({
        subject_id:subjectId ,
        assignment_id: assignmentId,
        path: newPath,
        created_at: Date.now(),
      });
      try {
        await User.findOneAndUpdate(
          { userId },
          { $push: { submissions: newSubmission } }
        );
        res.status(200).send(" Submission added successfully!");
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  });

  //   const { userId, subjectId, assignmentId } = req.body;
});

router.get("/subjects/:userId", async (req, res) => {
 
 const userId=req.params.userId;

  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  } else {
    let subjects = new Set((user.subjects));
    subjects = Array.from(subjects);

    const subjectDetails = await Promise.all(subjects.map(async (id) => {
      const meta = await Subject.findOne({ subject_id: id });
      return { title: meta.title, subjectId: meta.subject_id };
    }));

    res.status(200).send(subjectDetails);
  }


});


router.get("/assignments/:userId/:subjectId", async (req, res) => {
 
  const userId=req.params.userId;
  const subjectId=req.params.subjectId;
  console.log(req.params);
  const subject=(await Subject.findOne({subject_id:subjectId}));
  const assignments= subject.assignments || [] ;
  assignments.filter((item)=>{
    return item.assignment_id!==undefined;
  })
  res.status(200).send(assignments);
 });


router.put("/enroll", async (req, res) => {
  const { userId, subjectId } = req.body;

  let user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  } else {
    if (user.subjects === undefined) {
      user.subjects = [subjectId];
      user.save();
      res.status(200).send(" Enrolled in subject successfully!");
    }
    const subjectFound = user.subjects.includes(subjectId);
    if (subjectFound) {
      res.status(200).send(" User already enrolled in subject!");
    } else {
      try {
        const result = await User.findOneAndUpdate(
          { userId },
          { $push: { subjects: subjectId } }
        );
        res.status(200).send(" Enrolled in subject successfully!");
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  }
});
module.exports = router;
