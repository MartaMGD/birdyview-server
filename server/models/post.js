const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        author:
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
        image:
        {
            type: String,
            required: false
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema);