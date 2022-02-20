const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: true
        },
        title: 
        {
            type: String,
            required: true
        },
        body: 
        {
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema);