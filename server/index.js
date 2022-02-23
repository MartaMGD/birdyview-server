require("./config/config.js");

// Imports
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// App
const app = express();

// Routes
const birds = require("./routes/birds.js");
const users = require("./routes/users.js");

// Middleware and parsers
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/birds", birds);
app.use("/users", users);

// Connection to DATABASE
mongoose.connect("mongodb://localhost:27017/birdyview");

const db = mongoose.connection;
db.on("error", error => console.log("Conexión fallida", error));
db.once("open", () => console.log("Conexión correcta."));

app.listen(process.env.PORT, () => {
    console.log(`Web server listening at port ${process.env.PORT}`);
});
