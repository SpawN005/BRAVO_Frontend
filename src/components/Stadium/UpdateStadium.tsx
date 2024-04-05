// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import stadiumService, { Stadium } from '@/services/stadium/stadiumService';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import Link from 'next/link';


// Define the StadiumUpdate component
const StadiumUpdate: React.FC = () => {
  // Use usePathname to get the current pathname
  const pathname = usePathname();
  // Extract stadium ID from pathname
  const pathSegments = pathname.split('/');
  const stadiumId = pathSegments[pathSegments.length - 1];

  // Define stadium state
  const [stadium, setStadium] = useState<Stadium | null>(null);
  // Define map state
  const [map, setMap] = useState<any>(null);

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the stadium state with the new value
    setStadium((prevStadium) => ({
      ...prevStadium,
      [name]: value,
    }));
  };

  // Function to handle stadium update
  const handleUpdateStadium = async () => {
    try {
      // Call the stadiumService function to update the stadium
      await stadiumService.updateStadium(stadiumId, stadium);
      // Redirect or do something else after successful update
    } catch (error) {
      // Handle error if updating fails
      console.error('Error updating stadium:', error);
    }
  };

  // useEffect hook to fetch stadium data
  useEffect(() => {
    // Function to fetch stadium data
    const fetchStadium = async () => {
      try {
        // Fetch stadium data by ID
        const fetchedStadium = await stadiumService.getStadiumById(stadiumId);
        // Set fetched stadium data in state
        setStadium(fetchedStadium);
      } catch (error) {
        // Handle error if fetching fails
        console.error('Error fetching stadium:', error);
      }
    };

    // Check if stadium ID is available
    if (stadiumId) {
      // Call fetchStadium function
      fetchStadium();
    }
  }, [stadiumId]); // Pass stadiumId as a dependency to useEffect

  // Function to initialize Google Map
  const initMap = () => {
    const tunis = { lat: 36.8065, lng: 10.1815 }; // Default coordinates for Tunis
    let initialLocation = tunis; // Default initial location
    let marker: any = null; // Define marker variable

    // Check if stadium and stadium location are available
    if (stadium && stadium.location) {
      const location = stadium.location.split(',');
      const lat = parseFloat(location[0].trim());
      const lng = parseFloat(location[1].trim());
      initialLocation = { lat, lng }; // Set initial location to stadium's location
    }

    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: initialLocation, // Set initial map center
      zoom: 10,
    });
    setMap(mapInstance);

    if (stadium && stadium.location) {
      const location = stadium.location.split(',');
      const lat = parseFloat(location[0].trim());
      const lng = parseFloat(location[1].trim());
      marker = new window.google.maps.Marker({
        position: { lat, lng }, // Set marker position to stadium's location
        map: mapInstance,
        title: 'Stadium',
      });
    }

    mapInstance.addListener('click', async (e: any) => {
      const latLng = e.latLng;
      const location = `${latLng.lat()}, ${latLng.lng()}`;
      setStadium((prevStadium) => ({
        ...prevStadium,
        location,
      }));

      // Move the marker to the clicked location or create a new marker if it doesn't exist
      if (marker) {
        marker.setPosition(latLng);
      } else {
        marker = new window.google.maps.Marker({
          position: latLng,
          map: mapInstance,
          title: 'Stadium',
        });
      }

      // Fetch address using OpenStreetMap Nominatim API and update address field
      const address = await getAddressFromCoordinates(latLng.lat(), latLng.lng());
      setStadium((prevStadium) => ({
        ...prevStadium,
        address,
      }));
    });
  };

  // Load Google Maps API script and initialize map on load
  useEffect(() => {
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
  }, [stadium]); // Re-run effect when stadium changes

  // Function to fetch address from coordinates using OpenStreetMap Nominatim API
  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching address:', data.error.message);
        return '';
      }
      const address = data.display_name;
      return address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return '';
    }
  };

  // Return JSX for the component
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Update Stadium</h1>

      <div className="w-full">
        <div id="map" style={{ height: '300px', marginBottom: '20px' }}></div>

        {/* Input fields for name, location, address, capacity, and isAvailable */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={stadium?.name || ''} // Use optional chaining to handle null stadium
            onChange={handleInputChange} // Call handleInputChange function to handle input change
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <input
            type="hidden"
            name="location"
            value={stadium?.location || ''} // Use optional chaining to handle null stadium
            onChange={handleInputChange} // Call handleInputChange function to handle input change
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Address:</label>
          <input
            type="text"
            name="address"
            value={stadium?.address || ''} // Use optional chaining to handle null stadium
            onChange={handleInputChange} // Call handleInputChange function to handle input change
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Capacity:</label>
          <input
            type="text"
            name="capacity"
            value={stadium?.capacity || ''} // Use optional chaining to handle null stadium
            onChange={handleInputChange} // Call handleInputChange function to handle input change
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-sm font-medium text-gray-600">
            Available:
            <input
              type="checkbox"
              name="isAvailable"
              checked={stadium?.isAvailable || false} // Use optional chaining to handle null stadium
              onChange={handleInputChange} // Call handleInputChange function to handle input change
              className="ml-2"
            />
          </label>
        </div>
        <Link href={`/stadium`}>

        <button
          onClick={handleUpdateStadium} // Call handleUpdateStadium function to handle stadium update
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Update Stadium
        </button>
        </Link>
      </div>
    </div>
  );
};

// Export the StadiumUpdate component
export default StadiumUpdate;
