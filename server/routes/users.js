const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();


// JSON TO JAVASCRIPT PARSER
router.use(express.json());
const User = require("../models/user");

// GET METHOD TO RECEIVE INFO
router.get("/", (req, res) => {
    const from = req.query.from || 0;
    const limit = req.query.limit || 3;
    
    User.find({active: true},"username email role_id")
        .skip(Number(from))
        .limit(Number(limit))
        .exec((error,userDB) => {
            if(error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(200).json({
                    ok:true,
                    user: userDB
                });
            }
        });
});

// POST METHOD TO REGISTER USER
router.post("/", async (req, res) => {
    const { firstname, lastname, username, email, password, isAdmin } = req.body;
    try {
        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body,isAdmin,
        })
        res.json({status:'ok'})
    } catch (err) {
        res.json({status: 'error', error: 'Duplicate email'})
    }
    
});

// POST METHOD TO LOGIN USER
router.post("/login", async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign({
            username: req.body.username,
            email: req.body.email,
        }, 'secret123')

        return res.json({status: 'ok', user: token})
    } else {
        res.json({status: 'error', user: false})
    }
})

// PUT METHOD TO UPDATE
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, username, email, password, isAdmin } = req.body;
    User.findByIdAndUpdate(
        id,
        { firstname, lastname, username, email, password, isAdmin },
        {
            new: true,
            runValidators: true,
            context: "query" // Para que se ejecute las validaciones por campo único
        },
        (error, userDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(200).json({
                    ok: true,
                    user: userDB
                });
            }
        }
    );
});

//  DELETE METHOD
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    // Hard delete
    User.findByIdAndDelete(
        id,
        (error, userDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(204).json({
                    ok: true,
                    user: userDB
                });
            }
        }
    )

    // Soft delete
    User.findByIdAndUpdate(
        id,
        { active: false },
        { new: true },
        (error, userDB) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            } else {
                res.status(200).json({
                    ok: true,
                    user: userDB
                });
            }
        }
    )
});

module.exports = router;