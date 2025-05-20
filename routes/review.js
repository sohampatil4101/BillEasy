const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Book = require("../models/Book");
const fetchUser = require("../middleware/fetchUser");

// Add review (one per user per book)
router.post("/books/:id/reviews", fetchUser, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const bookId = req.params.id;

        const existing = await Review.findOne({ user: req.user.id, book: bookId });
        if (existing) return res.status(400).json({ error: "You already reviewed this book" });

        const review = new Review({ user: req.user.id, book: bookId, rating, comment });
        await review.save();

        await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

        res.json(review);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Update your review
router.put("/reviews/:id", fetchUser, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
        return res.status(403).send("Unauthorized");

    const { rating, comment } = req.body;
    review.rating = rating;
    review.comment = comment;
    await review.save();
    res.json(review);
});

// Delete your review
router.delete("/reviews/:id", fetchUser, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
        return res.status(403).send("Unauthorized");

    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
    await review.remove();
    res.json({ success: true });
});

module.exports = router;
