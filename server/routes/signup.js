const { req, res } = require('express');
const express = require('express');
const router = express.Router();

const signUpTemplateCopy = require('../models/signupmodel');

router.post("/", (req, res) => {
    const body = req.body;

    let signedUpUser = new signUpTemplateCopy({
        username: body.username,
        email: body.email,
        password: body.password
    })


    signedUpUser.save((err, signedupuserDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        } else {
            res.json({
                ok: true,
                user: signedupuserDB,
            });
        }
    });
});

module.exports = router;