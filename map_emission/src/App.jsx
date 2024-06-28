import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100vw',
  height: '100vw'
};

const App = () => (
  <APIProvider apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
    <Map
      style={containerStyle}
      defaultCenter={{lat: 42.3500635818502, lng: -71.10313354361499}}
      defaultZoom={18}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default App;