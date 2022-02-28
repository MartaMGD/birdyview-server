// Imports
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// App
const app = express();

// Routes
const birds = require("./routes/birds.js");
const users = require("./routes/users.js");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const birdwatchingRoute = require("./routes/birdwatching");

// Middleware and parsers
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/birds", birds);
app.use("/users", users);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/birdwatching", birdwatchingRoute);

// Connection to DATABASE
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", error => console.log("Connection error", error));
db.once("open", () => console.log("Connection successful."));

app.listen(5000, () => {
    console.log(`Web server listening at port 5000.`);
});
