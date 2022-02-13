const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: ""
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password : {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: validRoles,
        default: "USER"
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(uniqueValidator, {message: "{PATH} should be unique."});

module.exports = mongoose.model("User", userSchema);