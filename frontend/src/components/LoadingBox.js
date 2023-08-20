// Importar el módulo Spinner de react-bootstrap
import Spinner from 'react-bootstrap/Spinner';

// Definir la componente LoadingBox
export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}