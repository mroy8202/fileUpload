const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("DB coneection successfull"))
    .catch( (error) => {
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    } );
};

