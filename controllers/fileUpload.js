const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function
// upload file on server
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
};

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto";
    if(quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload -> handler
// upload image on cloudinary and create an entry in database
exports.imageUpload = async (req, res) => {
    try {
        // fetch data
        const { name, tags, email } = req.body;
        console.log("name: ", name);
        console.log("tags: ", tags);
        console.log("email: ", email);

        // fetch image
        const file = req.files.imageFile;
        console.log("image: ", file);

        // validation on image file type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // when file format is supported, upload to cloudinary
        const response = await uploadFileToCloudinary(file, "mritunjayCloudinary");
        console.log("response: ", response);


        // save entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        // send a successfull response
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        });
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error in uploading image"
        });
    }
}

// video upload -> handler
// uploads video on cloudinary and create an entry in database
exports.videoUpload = async (req, res) => {
    try {
        // fetch data
        const { name, tags, email } = req.body;
        console.log("name: ", name);
        console.log("tags: ", tags);
        console.log("email: ", email);

        // fetch video
        const file = req.files.videoFile;
        console.log("file: ", file);

        // validation on image file type
        const supportedTypes = ["mp4", "mov", "mkv"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // add a upper limit of 5 mb for video????????????????
        if(file.size > 5 * 1024 * 1024) {
            res.status(400).json({
                success: false,
                message: "Video file is greater than 5 mb"
            });
        }

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // when file format is supported, upload to cloudinary
        
        const response = await uploadFileToCloudinary(file, "mritunjayCloudinary");
        console.log("response: ", response);

        // save entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        });

        // send a successfull response
        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video successfully uploaded"
        });
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error in uploading video"
        });
    }
}

// image reduce -> handler
// reduce the image size 
exports.imageSizeReducer = async (req, res) => {
    try {
        // fetch data
        const { name, tags, email } = req.body;
        console.log("name: ", name);
        console.log("tags: ", tags);
        console.log("email: ", email);

        // fetch image
        const file = req.files.imageFile;
        console.log("image: ", file);

        // validation on image file type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // when file format is supported, upload to cloudinary
        const response = await uploadFileToCloudinary(file, "mritunjayCloudinary", 30);
        console.log("response: ", response);


        // save entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        // send a successfull response
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        });
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error in reducing image size"
        });
    }
}

