const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ error: "Access Denied" });

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ error: "Invalid Token" });
    }
};
