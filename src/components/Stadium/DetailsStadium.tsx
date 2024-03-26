'use client'
// components/Stadium/DetailsStadium.tsx
import React, { useState, useEffect } from 'react';
import stadiumService, { Stadium } from '@/services/stadium/stadiumService';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

const StadiumDetail: React.FC = () => {
  const pathname = usePathname(); // Use usePathname to get the current pathname
  const pathSegments = pathname.split('/');
  const stadiumId = pathSegments[pathSegments.length - 1]; // Extract stadium ID from pathname

  const [stadium, setStadium] = useState<Stadium | null>(null); // Define stadium state

  useEffect(() => {
    const fetchStadiumData = async () => {
      try {
        const fetchedStadium = await stadiumService.getStadiumById(stadiumId);
        setStadium(fetchedStadium); // Set fetched stadium data to state
      } catch (error) {
        console.error('Error fetching stadium data:', error);
        // Handle error
      }
    };

    if (stadiumId) {
      fetchStadiumData();
    }
  }, );

  return (
    <div>
      {stadium ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{stadium.name}</h1>
          <p>Location: {stadium.location}</p>
          <p>Capacity: {stadium.capacity}</p>
          <p>Available: {stadium.isAvailable ? 'Yes' : 'No'}</p>
          {/* Add Google Maps here */}
          <div id="map" style={{ height: '300px', marginTop: '20px' }}></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StadiumDetail;
