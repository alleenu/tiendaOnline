import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

// Definir la componente SearchBox
export default function SearchBox() {
   // Utilizar el hook useNavigate de react-router-dom
  const navigate = useNavigate();
   // Estado para almacenar el valor de búsqueda
  const [query, setQuery] = useState('');
  // Función para manejar el envío del formulario de búsqueda
  const submitHandler = (e) => {
    e.preventDefault();
    // Navegar a la página de búsqueda con el término de búsqueda en la URL
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="danger" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}