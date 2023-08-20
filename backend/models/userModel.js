import mongoose from 'mongoose';

// Definición del esquema para los usuarios
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // Nombre del usuario
    email: { type: String, required: true, unique: true }, // Correo electrónico del usuario (único)
    password: { type: String, required: true },      // Contraseña del usuario
    resetToken: { type: String },                    // Token de reinicio de contraseña (si aplicable)
    isAdmin: { type: Boolean, default: false, required: true }, // Indicador de administrador
  },
  {
    timestamps: true, // Agregar timestamps de creación y actualización
  }
);

// Crear el modelo "User" basado en el esquema definido
const User = mongoose.model('User', userSchema);

export default User; // Exportar el modelo
