const express = require("express");
const router = express.Router();

router.use(express.json());
const Birdwatching = require("../models/birdwatchingmodel");

// GET METHOD TO RECEIVE BIRDWATCHING INFO
router.get("/", (req, res) => {
    const from = req.query.from || 0;
    const limit = req.query.limit || 3;

    Birdwatching.find({ active: true }, "userId birdname location date hour _id")
        .skip(Number(from))
        .limit(Number(limit))
        .exec((error, birdwatchingDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(200).json({
                    ok: true,
                    birdwatching: birdwatchingDB
                });
            }
        });
});

// POST METHOD TO REGISTER WATCHED BIRD
router.post("/", async (req, res) => {
    const { userId, birdname, location, date, hour} = req.body;
    try {
        const birdwatching = await Birdwatching.create({
            userId: req.body.userId,
            birdname: req.body.birdname,
            location: req.body.location,
            date: req.body.date,
            hour: req.body.hour
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Error' })
    }

});

// PUT METHOD TO UPDATE WATCHED BIRD
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { birdname, location, date, hour} = req.body;
    Birdwatching.findByIdAndUpdate(
        id,
        { birdname, location, date, hour},
        {
            new: true,
            runValidators: true,
            context: "query" // Validations 
        },
        (error, birdwatchingDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(200).json({
                    ok: true,
                    birdwatching: birdwatchingDB
                });
            }
        }
    );
});

//  DELETE METHOD
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    // Hard delete
    Birdwatching.findByIdAndDelete(
        id,
        (error, birdwatchingDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(204).json({
                    ok: true,
                    birdwatching: birdwatchingDB
                });
            }
        }
    )
});

module.exports = router;