import React, {useState, useRef} from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import './App.css';
import Dropdown from './Dropdown.jsx';
import AI from './AI.jsx';

const libraries = ['places'];

function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  }

  const [reset, setReset] = useState(false);

  const [CO2, setCO2] = useState(0);

  const [carModel, setCarModel] = useState('')

  const getCO2 = (co2) => {
    setCO2(co2)
  }

  const getCarModel = (car) => {
    setCarModel(car)
  }

  const [selectedMode, setSelectedMode] = useState('DRIVING')

  const handleChange = (event) => {
    setSelectedMode(event.target.value);
  };
  
  const center = { lat: 42.3500635818502, lng: -71.10313354361499}

  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [distanceInMeters, setDistanceInMeters] = useState(0)

  const startRef = useRef()
  const endRef = useRef()

  if (!isLoaded) {
    return <h1>loading...</h1>
  }

  async function calculateRoute() {
    if (startRef.current.value == '' || endRef.current.value == '') {
      return 
    }
    const directionService = new google.maps.DirectionsService()
    const transit = document.getElementById("mode").value
    const result = await directionService.route({
      origin: startRef.current.value,
      destination: endRef.current.value,
      travelMode: google.maps.TravelMode[transit]
    })
    setDirectionResponse(result)
    setDistance(result.routes[0].legs[0].distance.text)
    setDuration(result.routes[0].legs[0].duration.text)
    setDistanceInMeters(result.routes[0].legs[0].distance.value)
  }

  function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    startRef.current.value = ''
    endRef.current.value = ''
    setReset(true);
    setTimeout(() => setReset(false), 100)
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
          <div className="transit-selector">
            <b>Method of Transit: </b>
            <select id="mode" value={selectedMode} onChange={handleChange}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
          <div className='dropdown'>
            {selectedMode === 'DRIVING' && <Dropdown getCO2={getCO2} getCarModel={getCarModel} reset={reset}/>}
          </div>
          <div className='calculate'>
            <button onClick={calculateRoute}>Calculate Emissions</button>
          </div>
          <div className='clear'>
            <button onClick={clearRoute}>Clear</button>
          </div>
          <div className='result'>
           { distance && <p>Distance: {distance}</p> }
           { duration && <p>Duration: {duration}</p> }
           { distance && selectedMode === 'DRIVING' ? (
            <p>CO2 Emitted: {(CO2 * (distanceInMeters/1000)).toFixed(2)} grams</p>
           ) : distance && selectedMode === 'TRANSIT' ? (
            <p>CO2 Emitted: {(49 * (distanceInMeters/1000)).toFixed(2)} grams</p>
           ) : distance && (
            <p>No CO2 Emitted!</p>
           )}
          </div>
          <div className='ai-suggestion'>
            {distance && <AI carModel={carModel} transportation={selectedMode} distance={distance}/>}
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