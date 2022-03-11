// Imports
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

// App
const app = express();

// Routes
const birds = require("./routes/birds.js");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const birdwatchingRoute = require("./routes/birdwatching");
const postRoute = require("./routes/posts");

// Middleware and parsers
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/birds", birds);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/birdwatching", birdwatchingRoute);
app.use("/api/posts", postRoute);

// Connection to DATABASE
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", error => console.log("Connection error", error));
db.once("open", () => console.log("Connection successful."));

app.listen(5000, () => {
    console.log(`Web server listening at port 5000.`);
});
