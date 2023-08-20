import mongoose from 'mongoose';

// Definición del esquema para las reseñas
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },    // Nombre del revisor
    comment: { type: String, required: true }, // Comentario de la reseña
    rating: { type: Number, required: true },  // Calificación de la reseña
  },
  {
    timestamps: true, // Agregar timestamps de creación y actualización
  }
);

// Definición del esquema para los productos
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Nombre del producto (único)
    slug: { type: String, required: true, unique: true }, // Slug del producto (único)
    image: { type: String, required: true },              // URL de la imagen del producto
    images: [String],                                     // URLs de imágenes adicionales del producto
    brand: { type: String, required: true },              // Marca del producto
    category: { type: String, required: true },           // Categoría del producto
    description: { type: String, required: true },        // Descripción del producto
    price: { type: Number, required: true },              // Precio del producto
    countInStock: { type: Number, required: true },       // Cantidad en stock del producto
    rating: { type: Number, required: true },             // Calificación promedio del producto
    numReviews: { type: Number, required: true },         // Número total de reseñas del producto
    reviews: [reviewSchema],                             // Reseñas asociadas al producto
  },
  {
    timestamps: true, // Agregar timestamps de creación y actualización
  }
);

// Crear el modelo "Product" basado en el esquema definido
const Product = mongoose.model('Product', productSchema);

export default Product; // Exportar el modelo
