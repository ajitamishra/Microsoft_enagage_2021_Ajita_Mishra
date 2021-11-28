
require("dotenv").config();
const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const passport = require("passport");
const users = require("./routes/api/users");
const subjects = require("./routes/api/subjects");

const app=express();

app.use(
    express.urlencoded({
      extended: false
    })
  );
  app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;
console.log(db);
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/subjects", subjects);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));