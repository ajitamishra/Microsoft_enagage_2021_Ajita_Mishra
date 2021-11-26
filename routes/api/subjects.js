const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const Subject = require("../../models/Subjects");
const User = require("../../models/Users");
const { Assignment } = require("../../models/Assignment");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

router.post("/create", async (req, res) => {
  const { subjectId, title } = req.body;
  const date = Date.now();
  const newSubject = new Subject({
    subject_id: subjectId,
    title,
    date,
  });
  const result = await newSubject.save();
  //   console.log(result);
  res.status(200).send(result);
});


router.patch("/add-teacher", async (req, res) => {
  const { subjectId, userId } = req.body;
  //   console.log("Add teacher => ", { subjectId, userId });
  const subject = await Subject.findOne({ subject_id: subjectId });

  if (!subject) {
    return res.status(404).json({ message: "Subject not found." });
  }

  const teacher = await User.findOne({ userId });

  if (!teacher || teacher.role !== "Teacher") {
    return res.status(404).json({ message: "Teacher not found" });
  }

  try {
    await Subject.findOneAndUpdate(
      { subject_id: subjectId },
      { $push: { teachers: userId } }
    );
    if (!teacher.subjects.includes(subjectId)) {
      teacher.subjects.push(subjectId);
      await teacher.save();
    }
    res.status(200).send("Teacher added successfully!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/create-assignment", async (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
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
      const { title, subjectId, instruction } = _fields;
      const readStream = fs.createReadStream(oldPath);
      const writeStream = fs.createWriteStream(path.join(newPath));
      readStream.pipe(writeStream);

      const subject = await Subject.findOne({ subject_id: subjectId });

      if (!subject) {
        return res.status(404).json({ message: "Subject not found." });
      }
      const newAssignment = new Assignment({
        assignment_id: id,
        title,
        path: newPath,
        instruction,
        created_at: Date.now(),
      });
      //   console.log(newAssignment);
      try {
        await Subject.findOneAndUpdate(
          { subject_id: subjectId },
          { $push: { assignments: newAssignment } }
        );
        res.status(200).send(" Assignment added successfully!");
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  });
});

router.get("/all-submissions/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;
  const users = await User.find();
  const submissions = [];
  //   console.log(users);
  const response = users.forEach((user) => {
    user.submissions.forEach((submission) => {
      if (submission.assignment_id === assignmentId) {
        const obj = {
          userId: user.userId,
          title: submission.title,
          assignmentId: submission.assignment_id,
          time: submission.created_at,
          path: submission.path,
        };
        submissions.push(obj);
      }
    });
  });

  //   console.log(submissions);
  res.status(200).send(submissions);
});

router.get("/download/:fileName", async (req, res) => {
  const { fileName } = req.params;
  console.log(fileName);
  let filePath = path.join(__dirname, "../upload", fileName);
  const readStream = fs.createReadStream(filePath);
  readStream.on('error',()=>{
      res.status(404).send("File not found");
  })
  readStream.pipe(res);
  console.log(`Downloading ${filePath}`);
});

module.exports = router;
