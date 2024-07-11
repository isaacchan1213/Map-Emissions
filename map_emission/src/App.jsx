import React, {useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import './App.css'

function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };
  
  const center = { lat: 42.3500635818502, lng: -71.10313354361499}

  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const startRef = useRef()

  const endRef = useRef()

  if (!isLoaded) {
    return <h1>loading...</h1>
  }

  async function calculateRoute() {
    if (startRef.current.value == '' || endRef.current.value == '') {
      return 
    }
    const directionService = new window.google.maps.DirectionsService()
    const result = await directionService.route({
      origin: startRef.current.value,
      destination: endRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(result)
    setDistance(result.routes[0].legs[0].distance.text)
    setDuration(result.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    startRef.current.value = ''
    endRef.current.value = ''
  }
  return (
    <div className='main'>
      <div className='user-interface'>
        <div className='title'>
            <h1>Map your emissions now.</h1>
        </div>
        <div className='search-destination'>
          <div className='starting'>
            <Autocomplete>
              <input type="text" placeholder='Start Location' ref={startRef}/>
            </Autocomplete>
          </div>
          <div className='end'>
            <Autocomplete>
              <input type="text" placeholder='End Location' ref={endRef}/>
            </Autocomplete>
          </div>
          <div className='calculate' type='submit' onClick={calculateRoute}>
            <button>Calculate Emissions</button>
          </div>
      </div>
      </div>
      <div className='map'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;