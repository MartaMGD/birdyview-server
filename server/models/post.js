const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true
        },
        title: 
        {
            type: String,
            required: true
        },
        extract:
        {
            type: String,
            required: true
        },
        body: 
        {
            type: String,
            required: true
        },
        photo:
        {
            type: String,
            required: false
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema);