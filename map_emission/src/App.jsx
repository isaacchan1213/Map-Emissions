import React from 'react';
import {createRoot} from 'react-dom/client';
import { useJsApiLoader, GoogleMap, Autocomplete} from '@react-google-maps/api';
import './App.css'

const containerStyle = {
  width: '100vw',
  height: '100vw'
};

const center = { lat: 42.3500635818502, lng: -71.10313354361499}

function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  if (!isLoaded) {
    return <h1>loading...</h1>
  }
  return (
    <div className='main'>
      <div className='user-interface'>
        <div className='bar'>
          <div className='title'>
              <h1>Map your emissions now.</h1>
          </div>
          <div className='search-destination'>
          <div className='starting'>
              <label htmlFor="starting">Starting Destination</label>
              <input type="search" id="search"/>
          </div>
          <div className='end'>
              <label htmlFor="end">End Destination</label>
              <input type="search" id="end"/>
          </div>
        </div>
        </div>
      </div>
      <div className='map'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;