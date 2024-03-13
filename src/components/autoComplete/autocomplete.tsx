"use client"

import React, { useState } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { log } from 'console';

const App = () => {
  const [type, setType] = useState('city');
  const [countryCodes, setCountryCodes] = useState(['us']);
  const [displayValue, setDisplayValue] = useState('');



  function onSuggestionChange(value) {
    console.log(value);
    // Mettez à jour les suggestions ou effectuez d'autres opérations en fonction du changement de suggestion
  }
  function sendGeocoderRequest(value, geocoder) {
    console.log(value); //the search term
    return geocoder.sendGeocoderRequest(value);
      
  }

  function sendPlaceDetailsRequest(feature, geocoder) {
    console.log("azeaze",feature); // the result of the search
    return geocoder.sendPlaceDetailsRequest(feature);
  }
  function position(feature) {
    console.log("azeaze",feature); // the result of the search
  }
  return (
    <GeoapifyContext apiKey="c6a8a1703401419ba0bafb69cb9433fc">
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
   
        position={position}
        sendGeocoderRequestFunc={sendGeocoderRequest}
        sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
      />
    </GeoapifyContext>
  );
}

export default App;
