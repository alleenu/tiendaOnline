import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

// Ruta para realizar la siembra (seed) de datos
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
     // Eliminar todos los productos existentes
    await Product.deleteMany({});
    // Insertar los productos de ejemplo en la base de datos
    const createdProducts = await Product.insertMany(data.products);
    // Eliminar todos los usuarios existentes
    await User.deleteMany({});
     // Insertar los usuarios de ejemplo en la base de datos
    const createdUsers = await User.insertMany(data.users);
   // Enviar una respuesta con la información de los productos y usuarios creados
    res.send({ createdProducts, createdUsers });
  } catch (error) {
     // Manejar un posible error y enviar una respuesta con el mensaje de error
    res.status(500).send({ message: 'Error seeding data.', error });
  }
});

export default seedRouter;
