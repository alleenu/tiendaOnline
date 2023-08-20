import axios from 'axios'; // Importar la biblioteca Axios para realizar solicitudes HTTP
import React, { useContext, useEffect, useRef, useState } from 'react'; // Importar hooks y componentes de React
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api'; // Importar componentes de Google Maps de la librería @react-google-maps/api
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación de React Router
import { Store } from '../Store'; // Importar el contexto de la tienda
import Button from 'react-bootstrap/Button'; // Importar el componente Button de React Bootstrap
import { toast } from 'react-toastify'; // Importar el componente de notificación react-toastify

const defaultLocation = { lat: 45.516, lng: -73.56 }; // Ubicación predeterminada
const libs = ['places']; // Librerías de Google Maps

export default function MapScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store); // Obtener el estado global y el despachador del contexto
  const { userInfo } = state; // Extraer información del usuario de la tienda
  const navigate = useNavigate(); // Hook de navegación
  const [googleApiKey, setGoogleApiKey] = useState(''); // Estado para almacenar la clave de API de Google Maps
  const [center, setCenter] = useState(defaultLocation); // Estado para almacenar el centro del mapa
  const [location, setLocation] = useState(center); // Estado para almacenar la ubicación seleccionada

  const mapRef = useRef(null); // Referencia al mapa
  const placeRef = useRef(null); // Referencia al cuadro de búsqueda de lugares
  const markerRef = useRef(null); // Referencia al marcador

  // Obtener la ubicación actual del usuario
  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    // Definir una función asíncrona para realizar la solicitud de clave de API de Google Maps
    const fetch = async () => {
      try {
        // Realizar una solicitud a la ruta '/api/keys/google'
        const { data } = await axios('/api/keys/google', {
          headers: { Authorization: `BEARER ${userInfo.token}` },
        });
        // Actualizar el estado con la clave de API obtenida
        setGoogleApiKey(data.key);
        // Obtener la ubicación actual del usuario
        getUserCurrentLocation();
      } catch (error) {
        // Si ocurre un error, manejarlo aquí (puede agregar código para mostrar una notificación de error)
      }
    };
  
    // Verificar si hay un token de usuario (autenticación)
    if (userInfo.token) {
      // Si hay un token, llamar a la función 'fetch' para obtener la clave de API
      fetch();
    }
  
    // Despachar una acción para actualizar el estado global (probablemente cambie el diseño)
    ctxDispatch({
      type: 'SET_FULLBOX_ON',
    });
  
    // La dependencia 'userInfo.token' indica que este efecto se ejecutará cada vez que 'userInfo.token' cambie
  }, [userInfo.token, ctxDispatch]);

  // Manejador de carga del mapa
  const onLoad = (map) => {
    mapRef.current = map;
  };

  // Manejador de eventos cuando el mapa está inactivo
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  // Manejador de carga de lugares
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  // Manejador de eventos cuando los lugares cambian
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  // Manejador de carga del marcador
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  // Manejador para confirmar la ubicación seleccionada
  const onConfirm = () => {
    const places = placeRef.current.getPlaces() || [{}];
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION', // Guardar la ubicación seleccionada en la tienda
      payload: {
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id,
      },
    });
    toast.success('Location selected successfully.'); // Mostrar notificación de éxito
    navigate('/shipping'); // Navegar a la página de envío
  };

  return (
    <div className="full-box">
      {/* Cargar el script de Google Maps y renderizar el mapa */}
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          {/* Cuadro de búsqueda de lugares */}
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <Button type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
          {/* Marcador en la ubicación seleccionada */}
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
