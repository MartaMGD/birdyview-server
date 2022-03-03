const express = require("express");
const router = express.Router();

router.use(express.json());
const Posts = require("../models/post");

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
router.put("/update/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            post.author = req.body.author;
            post.title = req.body.title;
            post.extract = req.body.extract;
            post.body = req.body.body;

            post
                .save()
                .then(() => res.json("El artículo ha sido actualizado"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

// Find post by id and DELETE
router.delete('/:id', (req,res) => {
    Posts.findByIdAndDelete(req.params.id)
    .then(() => res.json("El artículo ha sido eliminado."))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;