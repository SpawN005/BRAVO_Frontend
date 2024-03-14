// components/Stadium/index.tsx
'use client'
import React, { useState, useEffect } from 'react';
import StadiumService, { Stadium } from '@/services/stadium/stadiumService';
import Link from 'next/link';

const StadiumList: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [locationNames, setLocationNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StadiumService.getAllStadiums();
        setStadiums(data);

        // Extract latitude and longitude from the location field for each stadium
        const coordinates = data.map(stadium => stadium.location.split(',').map(parseFloat));
        getLocationNames(coordinates);
      } catch (error) {
        console.error('Error fetching stadiums:', error);
      }
    };

    fetchData();
  }, []);

  const getLocationNames = async (coordinates: number[][]) => {
    try {
      const names = await Promise.all(coordinates.map(async (coordinate) => {
        const [latitude, longitude] = coordinate;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        if (data.error) {
          console.error('Error fetching address:', data.error.message);
          return '';
        }
        const address = data.display_name;
        return address;
      }));
      setLocationNames(names);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stadiums</h1>

      {/* Stadium List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Capacity</th>
              <th className="py-2 px-4 border-b">Available</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium, index) => (
              <tr key={stadium._id}>
                <td className="py-2 px-4 border-b">{stadium.name}</td>
                <td className="py-2 px-4 border-b">{locationNames[index]}</td>
                <td className="py-2 px-4 border-b">{stadium.capacity}</td>
                <td className="py-2 px-4 border-b">{stadium.isAvailable ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Stadium Form */}
      <div className="mt-8">
        {/* Link to the CreateStadium page */}
        <Link href="/stadium/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Stadium
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StadiumList;
