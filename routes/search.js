const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Search books by title or author (case-insensitive)
router.get("/", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query required" });

    const regex = new RegExp(query, "i");
    const books = await Book.find({
        $or: [{ title: regex }, { author: regex }]
    });

    res.json(books);
});

module.exports = router;
