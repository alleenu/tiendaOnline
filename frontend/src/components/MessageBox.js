// Importar el módulo Alert de react-bootstrap
import Alert from 'react-bootstrap/Alert';

// Definir la componente MessageBox
export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}