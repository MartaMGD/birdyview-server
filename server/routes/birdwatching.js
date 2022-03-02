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
    const { userId, birdname, location, date, hour } = req.body;
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
router.put("/update", async (req, res) => {
    const newName = req.body.newName
    const newLocation = req.body.newLocation
    const newDate = req.body.newDate
    const newHour = req.body.newHour
    const id = req.body.id;

    try {
        await Birdwatching.findById(id, (error, birdToUpdate) => {
            birdToUpdate.birdname = newName
            birdToUpdate.location = newLocation
            birdToUpdate.date = newDate
            birdToUpdate.hour = newHour
            birdToUpdate.save();
        });
    } catch (err) {
        console.log(err);
    }

    res.send("Actualizado")
});

//  DELETE METHOD
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    Birdwatching.findByIdAndRemove(id).exec()
    res.send("Avistamiento eliminado.")
});

module.exports = router;