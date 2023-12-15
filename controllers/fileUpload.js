const File = require("../models/File");

// localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        // fetch file
        const file = req.files.file;
        console.log("File", file);

        // create path where file needs to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH-> ", path);

        // move (save) the file to the specified path
        file.mv(path, (err) => {
            console.log(err);
        });

        // create a successfull response
        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        });
    }
    catch(error) {
        console.log(error);
        message: "Error in uploading file"
    }
}