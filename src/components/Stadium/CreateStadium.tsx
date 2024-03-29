'use client'
import React, { useState, useEffect } from 'react';
import StadiumService, { NewStadium } from '@/services/stadium/stadiumService';
import { useRouter } from 'next/navigation';

const CreateStadium: React.FC = () => {
  const [newStadium, setNewStadium] = useState<NewStadium>({
    name: '',
    location: '',
    capacity: 0,
    isAvailable: false,
  });
  const [map, setMap] = useState<any>(null);
  const router = useRouter()
  useEffect(() => {
    // Load Google Maps script and initialize the map
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const tunis = { lat: 36.8065, lng: 10.1815 }; // Coordinates for Tunis
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: tunis,
      zoom: 10,
    });
    setMap(mapInstance);

    const marker = new window.google.maps.Marker({
      position: tunis,
      map: mapInstance,
      title: 'Tunis',
    });

    mapInstance.addListener('click', (e: any) => {
      const latLng = e.latLng;
      setNewStadium((prevStadium) => ({
        ...prevStadium,
        location: `${latLng.lat()}, ${latLng.lng()}`,
      }));

      // Move the marker to the clicked location
      marker.setPosition(latLng);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewStadium((prevStadium) => ({
      ...prevStadium,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddStadium = async () => {
    try {
      const addedStadium = await StadiumService.createStadium(newStadium);
      // Redirect to the stadium list page or any other desired page after adding a new stadium
      // You can use Next.js Router for navigation
      router.push('/stadium');
    } catch (error) {
      console.error('Error adding stadium:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Stadium</h1>

      <div className="w-full">
        <div id="map" style={{ height: '300px', marginBottom: '20px' }}></div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={newStadium.name}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Location:</label>
          <input
            type="text"
            name="location"
            value={newStadium.location}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={newStadium.capacity}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-sm font-medium text-gray-600">
            Available:
            <input
              type="checkbox"
              name="isAvailable"
              checked={newStadium.isAvailable}
              onChange={handleInputChange}
              className="ml-2"
            />
          </label>
        </div>

        <button
          onClick={handleAddStadium}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Stadium
        </button>
      </div>
    </div>
  );
};

export default CreateStadium;
