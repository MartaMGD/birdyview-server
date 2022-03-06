const express = require("express");
const router = express.Router();
const Posts = require("../models/post");
const User = require("../models/usermodel");
router.use(express.json());


router.get("/", (req, res) => {
    Posts.find()
        .then(post => res.json(post))
        .catch(err => res.status(400).res.json(`Error: ${err}`));
});

router.post("/add", (req, res) => {
    const newPosts = new Posts({
        author: req.body.author,
        title: req.body.title,
        extract: req.body.extract,
        body: req.body.body
    });

    newPosts
        .save()
        .then(() => res.json("Artículo añadido"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Find post by id
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Find post by id and UPDATE
router.put("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.username === req.body.username)
            try {
                const updatedPost = await Post.findByIdAndUpdate(
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

// Find post by id and DELETE
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Posts.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Usuario eliminado");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("Usuario no encontrado")
        }
    } else {
        res.status(401).json("Solo puedes eliminar tu cuenta.")
    }
})

module.exports = router;