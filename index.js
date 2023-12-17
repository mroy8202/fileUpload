const express = require("express");
require("dotenv").config();
const fileupload = require("express-fileupload");
const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
const Upload = require("./routes/FileUpload");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
// middleware to upload file at server
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// dbconnect
db.connect();

// cloudinary
cloudinary.cloudinaryConnect();

// mount api routes
app.use("/api/v1/upload", Upload);

// activate server
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
