// Importar los módulos necesarios de React y react-bootstrap
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Definir la componente CheckoutSteps que acepta un objeto 'props'
export default function CheckoutSteps(props) {
  return (
     // Utilizar una fila para organizar las columnas
    <Row className="checkout-steps">  
     {/* Cada columna representa un paso del proceso */}
      {/* Si el paso está activo (props.stepX es true), se agrega la clase 'active' */}
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
}