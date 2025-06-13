const mongoose = require("mongoose")
require("dotenv").config();

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión a MongoDB establecida"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message)
    process.exit(1)
  })

module.exports = mongoose.connection
