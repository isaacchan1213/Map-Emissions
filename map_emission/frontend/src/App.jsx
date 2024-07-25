import React, {useState, useRef, useEffect} from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import './App.css';
import Dropdown from './Dropdown.jsx';
import AI from './AI.jsx';
import TransitButton from './TransitButton.jsx'
import carImage from './assets/car.png';
import bicycleImage from './assets/bicycle.png';
import trainImage from './assets/train.png';
import walkingImage from './assets/walking.png';
import earthImage from './assets/earth.svg';
import clockImage from './assets/clock.png';
import markerImage from './assets/marker.png';
import smokeImage from './assets/smoke.png';
import treeImage from './assets/tree.png';

const libraries = ['places'];

function App() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries
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

  const [selectedMode, setSelectedMode] = useState(null)

  const handleButtonClick = (type) => {
    setSelectedMode(type);
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
    const transit = selectedMode
    const result = await directionService.route({
      origin: startRef.current.value,
      destination: endRef.current.value,
      travelMode: google.maps.TravelMode[transit],
    })
    setDirectionResponse(result)
    setDistance(result.routes[0].legs[0].distance.text)
    setDuration(result.routes[0].legs[0].duration.text)
    setDistanceInMeters(result.routes[0].legs[0].distance.value)
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance('')
    setDuration('')
    startRef.current.value = ''
    endRef.current.value = ''
    setReset(true);
    handleButtonClick(null);
    setTimeout(() => {
      setReset(false);
    }, 100);
  }

  return (
    <div className='main'>
      <div className='user-interface'>
        <div className='title'>
            <h1>Map your emissions <span style={{ color: 'green' }}>now</span>.</h1>
            <img src={earthImage} alt="earth"/>
        </div>
        <div className='search-destination'>
          <div className='autocomplete-wrapper'>
            <Autocomplete>
              <input type="text" placeholder='Start Location' ref={startRef}/>
            </Autocomplete>
          </div>
          <div className='autocomplete-wrapper'>
            <Autocomplete>
              <input type="text" placeholder='End Location' ref={endRef}/>
            </Autocomplete>
          </div>
        </div>
        <div className="transit-selector">
            <TransitButton 
              src={carImage}
              isActive={selectedMode === 'DRIVING'}
              onClick={() => handleButtonClick('DRIVING')}
            />
            <TransitButton 
              src={bicycleImage}
              isActive={selectedMode === 'BICYCLING'}
              onClick={() => handleButtonClick('BICYCLING')}
            />
            <TransitButton 
              src={walkingImage}
              isActive={selectedMode === 'WALKING'}
              onClick={() => handleButtonClick('WALKING')}
            />
            <TransitButton 
              src={trainImage}
              isActive={selectedMode === 'TRANSIT'}
              onClick={() => handleButtonClick('TRANSIT')}
            />
          </div>
          <div className='dropdown'>
            {selectedMode === 'DRIVING' && <Dropdown getCO2={getCO2} getCarModel={getCarModel} reset={reset}/>}
          </div>
          <div className='buttons'>
            <div className='button'>
                <button onClick={calculateRoute}>Calculate Emissions</button>
            </div>
            <div className='button'>
              {distance && <button onClick={clearRoute}>Clear</button>}
            </div>
          </div>
          <div className='result'>
           { distance && 
           (<div className='stat'>
             <p><strong>Distance:</strong> {distance}</p>
             <img src={markerImage}/>
           </div>) 
           }
           { duration && 
           (<div className='stat'>
              <p><strong>Duration:</strong> {duration}</p>
              <img src={clockImage}/>
            </div>) 
            }
           { distance && selectedMode === 'DRIVING' ? (
            <div className="stat">
              <p><strong>CO2 Emitted:</strong> {(CO2 * (distanceInMeters/1000)).toFixed(2)} grams</p>
              <img src={smokeImage}/>
            </div>
           ) : distance && selectedMode === 'TRANSIT' ? (
            <div className="stat">
              <p><strong>CO2 Emitted:</strong> {(49 * (distanceInMeters/1000)).toFixed(2)} grams</p>
              <img src={smokeImage}/>
            </div>
           ) : distance && (
            <div className="stat">
              <strong>No CO2 Emitted!</strong>
              <img src={treeImage}/>
            </div>
           )}
          </div>
          <div className='ai-suggestion'>
            {distance && <AI carModel={carModel} transportation={selectedMode} distance={distance}/>}
          </div>
      </div>
      <div className='map'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {selectedMode && <DirectionsRenderer directions={directionResponse} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;