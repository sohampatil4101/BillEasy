const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: secPass });
        await user.save();

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
