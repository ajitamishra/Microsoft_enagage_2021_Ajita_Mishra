const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const methodoverride=require('method-override');
const passport = require("passport");
const users = require("./routes/api/users");
const subjects = require("./routes/api/subjects");
const router = express.Router();



const app=express();

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
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
router.get('/',(req,res)=>{
  res.send('Server is up and running!')
})
app.use("/api/users", users);
app.use("/api/subjects", subjects);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));