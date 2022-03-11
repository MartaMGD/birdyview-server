const express = require("express");
const router = express.Router();
const Birdwatching = require("../models/birdwatchingmodel");
router.use(express.json());


// TO GET ALL WATCHED BIRDS IN TABLE
router.get("/", async (req, res) => {
    const username = req.query.user;
    try {
        let birdwatching;
        if (username) {
            birdwatching = await Birdwatching.find({ username });
        } else {
            birdwatching = await Birdwatching.find();
        }
        res.status(200).json(birdwatching);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO REGISTER NEW BIRD IN TABLE
router.post("/", async (req, res) => {
    const newBird = new Birdwatching(req.body);
    try {
        const savedBird = await newBird.save();
        res.status(200).json(savedBird);
    } catch (err) {
        res.status(500).json
    }
});

// TO FIND BIRD BY ID
router.get("/:id", (req, res) => {
    Birdwatching.findById(req.params.id)
        .then(birdwatching => res.json(birdwatching))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// TO FIND BIRD IN TABLE BY ID AND UPDATE
router.put("/:id", async (req, res) => {
    try {
        const birdwatching = await Birdwatching.findById(req.params.id);
        if (birdwatching.username === req.body.username)
            try {
                const updatedBird = await Birdwatching.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedBird)
            } catch (err) {
                res.status(500).json(err);
            } else {
            res.status(401).json("Solo puedes actualizar tu propio avistamiento");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO FIND BIRD BY ID AND DELETE
router.delete('/:id', async (req, res) => {
    try {
        const birdwatching = await Birdwatching.findById(req.params.id);
        if (birdwatching.username === req.body.username) {
            try {
                await birdwatching.delete();
                res.status(200).json("Avistamiento eliminado");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Solo puedes eliminar tu propio avistamiento.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;