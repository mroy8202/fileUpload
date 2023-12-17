const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

// post middleware -> to send mails
// schema.pre/post("method", callback function)
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC: ", doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `Mritunjay`,
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>Congratulations!</h2> <p>Your file is uploaded, View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        });

        console.log("INFO: ", info);
    }
    catch(error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;