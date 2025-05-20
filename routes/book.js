const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Review = require("../models/Review");
const fetchUser = require("../middleware/fetchUser");

// Add book (authenticated)
router.post("/", fetchUser, async (req, res) => {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.json(book);
});

// Get all books (with pagination + filters)
router.get("/", async (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = genre;

    const books = await Book.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    res.json(books);
});

// Get book by ID (with avg rating + reviews)
router.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id).populate({
        path: "reviews",
        populate: { path: "user", select: "name" }
    });

    if (!book) return res.status(404).send("Book not found");

    const ratings = book.reviews.map(r => r.rating);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2) : null;

    res.json({ book, averageRating: avgRating });
});

module.exports = router;
