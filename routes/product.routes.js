const express = require("express")
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/product.controllers")
const { proteger, autorizar } = require("../middleware/auth.middleware")

const router = express.Router()

// Rutas de productos
router.route("/").get(obtenerProductos).post(proteger, crearProducto)

router.route("/:id").get(obtenerProductoPorId).put(proteger, actualizarProducto).delete(proteger, eliminarProducto)

module.exports = router
