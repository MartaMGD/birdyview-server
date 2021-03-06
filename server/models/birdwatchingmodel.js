const mongoose = require("mongoose");

const birdwatchingSchema = new mongoose.Schema(
    {
        birdname:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
            required: true
        },
        date:
        {
            type: String,
            required: true
        },
        hour:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Birdwatching", birdwatchingSchema);