import Axios from 'axios'; // Importar la biblioteca Axios para hacer solicitudes HTTP
import { useContext, useEffect, useState } from 'react'; // Importar hooks de React
import Container from 'react-bootstrap/Container'; // Importar el componente Container de React Bootstrap
import Button from 'react-bootstrap/Button'; // Importar el componente Button de React Bootstrap
import Form from 'react-bootstrap/Form'; // Importar el componente Form de React Bootstrap
import { Helmet } from 'react-helmet-async'; // Importar el componente Helmet asincrónico para gestionar el título de la página
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación de React Router
import { toast } from 'react-toastify'; // Importar el componente de notificación react-toastify
import { Store } from '../Store'; // Importar el contexto de la tienda
import { getError } from '../Utils'; // Importar la función para obtener errores

export default function ForgetPasswordScreen() {
  const navigate = useNavigate(); // Hook de navegación

  const [email, setEmail] = useState(''); // Estado para almacenar el valor del correo electrónico

  const { state } = useContext(Store); // Obtener el estado global de la tienda
  const { userInfo } = state; // Extraer información del usuario de la tienda

  useEffect(() => {
    // Redireccionar al inicio si el usuario ya ha iniciado sesión
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // Manejar el envío del formulario
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud para restablecer la contraseña
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message); // Mostrar notificación de éxito
    } catch (err) {
      toast.error(getError(err)); // Mostrar notificación de error
    }
  };

  return (
    <Container className="small-container">
      {/* Configurar el título de la página */}
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="my-3">Forget Password</h1>
      <Form onSubmit={submitHandler}>
        {/* Campo de entrada de correo electrónico */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Botón para enviar el formulario */}
        <div className="mb-3">
          <Button type="submit">submit</Button>
        </div>
      </Form>
    </Container>
  );
}
