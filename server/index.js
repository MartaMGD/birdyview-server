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

app.use("/birds", birds);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/birdwatching", birdwatchingRoute);
app.use("/api/posts", postRoute);
app.use("/server/images", express.static(path.join(__dirname, "/server/images")));

// Connection to DATABASE
mongoose.connect(process.env.MONGO_URL);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/images")
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("item"), (req,res) => {
    res.status(200).json("El archivo se ha subido");
})

const db = mongoose.connection;
db.on("error", error => console.log("Connection error", error));
db.once("open", () => console.log("Connection successful."));

app.listen(5000, () => {
    console.log(`Web server listening at port 5000.`);
});
