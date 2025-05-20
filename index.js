
const connecttomongodb = require("./db");
connecttomongodb();

const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());


require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Hello, This is the backend server for MediMate");
});

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");
const searchRoutes = require("./routes/search");

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", reviewRoutes);
app.use("/api/search", searchRoutes);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
