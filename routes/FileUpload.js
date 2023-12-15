const express = require("express");
const router = express.Router();

// import handlers from controllers
const { localFileUpload } = require("../controllers/fileUpload");

// api route
router.post("/localFileUpload", localFileUpload);


// export 
module.exports = router;