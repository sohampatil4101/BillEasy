const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    genre: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

module.exports = mongoose.model("Book", BookSchema);
