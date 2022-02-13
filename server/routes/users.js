const express = require("express");
const router = express.Router();

// CONVIERTE EL JSON EN OBJETO JAVASCRIPT DONDE LO NECESITE
router.use(express.json());
const User = require("../models/user");

// PETICIÓN GET
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

// MÉTODO POST
router.post("/", (req, res) => {
    // AQUÍ ESTAMOS GUARDANDO EL CUERPO QUE SE ENVÍA
    const { username, email, password, role } = req.body;

    const user = new User({ name, lastname, username, email, password, role });

    user.save((error, userDB) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            })
        } else {
            res.status(201).json({
                ok: true,
                user: userDB
            });
        }
    });
});

// MÉTODO PUT
// SE ACCEDE POR PARAMS. ES IMPORTANTE CITARLO. 
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, lastname, username, email, password, role } = req.body;
    User.findByIdAndUpdate(
        id,
        { name, lastname, username, email, password, role },
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

// MÉTODO DELETE
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