const express = require("express");
const router = express.Router();

const Bird = require("../models/bird");

// GET METHOD
router.get("/", (req, res) => {
    Bird.find({ active: true })
        .exec((err, birds) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            } else {
                res.json({
                    ok: true,
                    birds,
                });
            }
        });
});

// POST METHOD
router.post("/", (req, res) => {
    const body = req.body;

    let bird = new Bird({
        name: body.name,
        scientificname: body.scientificname,
        height: body.height,
        wingspan: body.wingspan,
        location: body.location,
        description: body.description
    })

    bird.save((err, birdDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        } else {
            res.json({
                ok: true,
                user: birdDB,
            });
        }
    });
});

module.exports = router;
