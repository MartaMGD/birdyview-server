const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username:{type: String, required: true, unique: true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        profilepicture: {type:String, default: ""},
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {timeskips: true}
);

module.exports = mongoose.model("Users", UserSchema);