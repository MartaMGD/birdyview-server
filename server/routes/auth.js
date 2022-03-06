const router = require("express").Router();
const User = require("../models/usermodel");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

// TO REGISTER
router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Credenciales erróneos.")

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Credenciales erróneos.")

        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;