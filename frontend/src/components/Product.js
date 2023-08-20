import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  // Utilizar el hook useContext para acceder al contexto 'Store'
  const { state, dispatch: ctxDispatch } = useContext(Store);

   // Extraer la información del carrito del estado global
  const {
    cart: { cartItems },
  } = state;

 // Función para manejar la adición de productos al carrito 
  const addToCartHandler = async (item) => {
     // Verificar si el producto ya existe en el carrito
    const existItem = cartItems.find((x) => x._id === product._id);
    // Calcular la nueva cantidad del producto
    const quantity = existItem ? existItem.quantity + 1 : 1;
     // Obtener información detallada del producto desde el servidor
    const { data } = await axios.get(`/api/products/${item._id}`);
    // Verificar si hay suficiente stock del producto
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
     // Enviar acción para agregar el producto al carrito a través del contexto
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    // Renderizar una tarjeta de producto utilizando react-bootstrap
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;