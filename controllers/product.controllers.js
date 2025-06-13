const Product = require("../models/product.model")

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    // Agregar el usuario actual como propietario del producto
    req.body.usuario = req.usuario.id

    const producto = await Product.create(req.body)

    res.status(201).json({
      success: true,
      data: producto,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: "Error al crear el producto",
      error: error.message,
    })
  }
}

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find()

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error.message,
    })
  }
}

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id)

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    res.status(200).json({
      success: true,
      data: producto,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al obtener el producto",
      error: error.message,
    })
  }
}

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    let producto = await Product.findById(req.params.id)

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    // Verificar si el usuario es el propietario del producto
    if (producto.usuario.toString() !== req.usuario.id && req.usuario.rol !== "admin") {
      return res.status(403).json({
        success: false,
        message: "No está autorizado para actualizar este producto",
      })
    }

    producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: producto,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error.message,
    })
  }
}

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id)

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    // Verificar si el usuario es el propietario del producto
    if (producto.usuario.toString() !== req.usuario.id && req.usuario.rol !== "admin") {
      return res.status(403).json({
        success: false,
        message: "No está autorizado para eliminar este producto",
      })
    }

    await producto.remove()

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message,
    })
  }
}
