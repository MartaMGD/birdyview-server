const express = require("express");
const router = express.Router();

router.use(express.json());
const Birdwatching = require("../models/birdwatchingmodel");

// GET METHOD TO RECEIVE BIRDWATCHING INFO
router.get("/", (req, res) => {
    Birdwatching.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    });
});

// POST METHOD TO REGISTER WATCHED BIRD
router.post("/", async (req, res) => {
    const { userId, birdname, location, date, hour } = req.body;

    const birdwatching = new Birdwatching({
        userId: userId,
        birdname: birdname,
        location: location,
        date: date,
        hour: hour
    });

    await birdwatching.save();
    res.send("Avistamiento añadido")
});

// PUT METHOD TO UPDATE WATCHED BIRD
router.put("/", async (req, res) => {
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