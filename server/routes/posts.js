const express = require("express");
const router = express.Router();
const Posts = require("../models/post");
const User = require("../models/usermodel");
router.use(express.json());

// TO GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    try {
        let posts;
        if (username) {
            posts = await Posts.find({ username });
        } else {
            posts = await Posts.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO CREATE NEW POST
router.post("/", async (req, res) => {
    const newPost = new Posts(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json
    }
});

// TO FIND POST BY ID
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// TO FIND POST BY ID AND UPDATE
router.put("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.username === req.body.username)
            try {
                const updatedPost = await Posts.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(500).json(err);
            } else {
            res.status(401).json("Solo puedes actualizar tu artículo");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO FIND POST BY ID AND DELETE
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Artículo eliminado");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Solo puedes eliminar tu propio artículo.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;