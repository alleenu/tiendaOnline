import { useEffect, useReducer } from "react"; // Importar los hooks useEffect y useReducer de React
import axios from "axios"; // Importar la biblioteca Axios para realizar solicitudes HTTP
import Row from "react-bootstrap/Row"; // Importar el componente Row de React Bootstrap
import Col from "react-bootstrap/Col"; // Importar el componente Col de React Bootstrap
import Product from "../components/Product"; // Importar el componente Product
import { Helmet } from "react-helmet-async"; // Importar el componente Helmet asincrónico para gestionar el título de la página
import LoadingBox from "../components/LoadingBox"; // Importar el componente LoadingBox
import MessageBox from "../components/MessageBox"; // Importar el componente MessageBox

// Reductor para administrar el estado
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // Utilizar el hook useReducer para administrar el estado con el reductor definido
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" }); // Iniciar la solicitud, establecer loading en true
      try {
        // Realizar una solicitud para obtener los productos
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data }); // Actualizar el estado con los datos recibidos
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message }); // Manejar errores y actualizar el estado
      }
    };
    fetchData(); // Llamar a la función para obtener los datos
  }, []);

  return (
    <div>
      {/* Configurar el título de la página */}
      <Helmet>
        <title>Tienda Online</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox /> // Mostrar LoadingBox si loading es true
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox> // Mostrar MessageBox con el mensaje de error si hay un error
        ) : (
          <Row>
            {/* Mapear los productos y mostrar cada uno */}
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product> {/* Mostrar el componente Product */}
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen; // Exportar el componente HomeScreen
