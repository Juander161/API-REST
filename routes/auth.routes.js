const express = require("express")
const { registro, login, getMe } = require("../controllers/auth.controllers")
const { proteger } = require("../middleware/auth.middleware")

const router = express.Router()

// Rutas de autenticación
router.post("/registro", registro)
router.post("/login", login)
router.get("/me", proteger, getMe)

module.exports = router
