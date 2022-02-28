const mongoose = require("mongoose");

const birdwatchingSchema = new mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: false
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
        },
        completed: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true
        },
    }
)

module.exports = mongoose.model("Birdwatching", birdwatchingSchema);