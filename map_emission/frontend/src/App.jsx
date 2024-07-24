import React, {useState, useRef, useEffect} from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import './App.css';
import Dropdown from './Dropdown.jsx';
import AI from './AI.jsx';
import TransitButton from './TransitButton.jsx'

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

  const [selectedMode, setSelectedMode] = useState('')

  const handleButtonClick = (mode) => {
    setSelectedMode(mode);
  };
  
  const center = { lat: 42.3500635818502, lng: -71.10313354361499}

  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [distanceInMeters, setDistanceInMeters] = useState(0)

  const directionsRendererRef = useRef(null);

  const startRef = useRef()
  const endRef = useRef()

  useEffect(() => {
    console.log('directionResponse changed:', directionResponse);
  }, [directionResponse]);

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
    console.log('Clearing route...');
    console.log('Before clear - directionResponse:', directionResponse);
    setDirectionResponse(null);
    if (directionsRendererRef.current) {
      directionsRendererRef.current = null;
    }
    setDistance('')
    setDuration('')
    startRef.current.value = ''
    endRef.current.value = ''
    setReset(true);
    setSelectedMode('');
    console.log('After clear - directionResponse:', directionResponse)
  }

  return (
    <div className='main'>
      <div className='user-interface'>
        <div className='title'>
            <h1>Map your emissions now.</h1>
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
              src="/images/car.png" 
              isActive={selectedMode === 'DRIVING'}
              onClick={() => handleButtonClick('DRIVING')}
            />
            <TransitButton 
              src="/images/bicycle.png" 
              isActive={selectedMode === 'BICYCLING'}
              onClick={() => handleButtonClick('BICYCLING')}
            />
            <TransitButton 
              src="/images/walking.png" 
              isActive={selectedMode === 'WALKING'}
              onClick={() => handleButtonClick('WALKING')}
            />
            <TransitButton 
              src="/images/train.png" 
              isActive={selectedMode === 'TRAIN'}
              onClick={() => handleButtonClick('TRAIN')}
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
              <button onClick={clearRoute}>Clear</button>
            </div>
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
      <div className='map'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {directionResponse && <DirectionsRenderer directions={directionResponse} ref={directionsRendererRef} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;