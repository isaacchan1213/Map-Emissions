import React from 'react';
import {createRoot} from 'react-dom/client';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vw'
};

const center = { lat: 42.3500635818502, lng: -71.10313354361499}

function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
  })

  if (!isLoaded) {
    return <h1>loading...</h1>
  }
  return (
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
    </GoogleMap>
  );
}

export default App;