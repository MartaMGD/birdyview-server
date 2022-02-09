require("./config/config.js");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const birds = require("./routes/birds.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/birds", birds);

mongoose.connect("mongodb://localhost:27017/birdyview");

const db = mongoose.connection;
db.on("error", error => console.log("Conexión fallida", error));
db.once("open", () => console.log("Conexión correcta."));

app.listen(process.env.PORT, () => {
    console.log(`Web server listening at port ${process.env.PORT}`);
});
