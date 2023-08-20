import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

// Definir la componente ProtectedRoute que acepta un prop 'children'
export default function ProtectedRoute({ children }) {
  // Utilizar el hook useContext para acceder al contexto 'Store'
  const { state } = useContext(Store);

  // Extraer la propiedad 'userInfo' del estado global
  const { userInfo } = state;

  // Verificar si el usuario está autenticado
  // Si está autenticado, renderizar las rutas protegidas
  // Si no está autenticado, redirigir al usuario a la página de inicio de sesión
  return userInfo ? children : <Navigate to="/signin" />;
}