const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoutes = require("./routes/product.routes")
const authRoutes = require("./routes/auth.routes")

// Cargar variables de entorno
dotenv.config()

const app = express()

// Middleware para parsear JSON
app.use(express.json())

// Conectar a la base de datos
require("./config/db")

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API RESTful de Gestión de Productos funcionando correctamente")
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Error en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// Puerto
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
