const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// Middleware para proteger rutas
exports.proteger = async (req, res, next) => {
  try {
    let token

    // Verificar si hay token en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No está autorizado para acceder a esta ruta",
      })
    }

    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Agregar el usuario al request
      req.usuario = await User.findById(decoded.id)

      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error en la autenticación",
      error: error.message,
    })
  }
}

// Middleware para verificar roles
exports.autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${req.usuario.rol} no está autorizado para acceder a esta ruta`,
      })
    }
    next()
  }
}
