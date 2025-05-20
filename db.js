const mongoose = require("mongoose");
require("dotenv").config();

const connecttomongodb = () => {
    try {
        const url = process.env.MONGOURL || "mongodb://localhost:27017/nodecrudapp";
        mongoose.connect(url);
        console.log("DB connected");
    } catch (err) {

        console.log(err);
        // Exit the process with failure code 1 (indicating an error)
        process.exit(1);
    }
};

module.exports = connecttomongodb;
