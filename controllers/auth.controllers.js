const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

// Registrar un nuevo usuario
exports.registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Verificar si el usuario ya existe
    let usuario = await User.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe",
      })
    }

    // Crear nuevo usuario
    usuario = await User.create({
      nombre,
      email,
      password,
    })

    // Generar token JWT
    const token = generarJWT(usuario._id)

    res.status(201).json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    })
  }
}

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const usuario = await User.findOne({ email }).select("+password")
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      })
    }

    // Verificar si la contraseña es correcta
    const esPasswordCorrecto = await usuario.compararPassword(password)
    if (!esPasswordCorrecto) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      })
    }

    // Generar token JWT
    const token = generarJWT(usuario._id)

    res.status(200).json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    })
  }
}

// Obtener información del usuario actual
exports.getMe = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id)

    res.status(200).json({
      success: true,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al obtener información del usuario",
      error: error.message,
    })
  }
}

// Función para generar JWT
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
