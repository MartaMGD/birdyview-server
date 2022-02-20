const mongoose = require("mongoose");

const BirdwatchingSchema = new mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: true
        },
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
        }
    }
)

module.exports = mongoose.model("Birdwatching", BirdwatchingSchema);