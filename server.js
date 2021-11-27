const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const subjects = require("./routes/api/subjects");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use("/api/users", users);
app.use("/api/subjects", subjects);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server up and running on port ${port} !`)
);
