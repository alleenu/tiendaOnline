// Importar los módulos necesarios de React y React Router
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store'; // Importar el contexto 'Store' desde un archivo

// Definir una componente llamada AdminRoute que acepta un prop 'children'
export default function AdminRoute({ children }) {
 // Utilizar el hook useContext para acceder al contexto 'Store' 
  const { state } = useContext(Store);
 // Extraer la propiedad 'userInfo' del estado global
  const { userInfo } = state;

  // Verificar si userInfo existe y si el usuario es un administrador
  // Si es administrador, renderizar las rutas protegidas
  // Si no es administrador, redirigir al usuario a la página de inicio de sesión
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}