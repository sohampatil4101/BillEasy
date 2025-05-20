const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
}, { timestamps: true });

ReviewSchema.index({ user: 1, book: 1 }, { unique: true }); // One review per user per book

module.exports = mongoose.model("Review", ReviewSchema);
