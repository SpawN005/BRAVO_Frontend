// components/Stadium/index.tsx
'use client'

import React, { useState, useEffect } from 'react';
import StadiumService, { Stadium } from '@/services/stadium/stadiumService';
import Link from 'next/link';


const StadiumList: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);

  const fetchStadiums = async () => {
    try {
      const data = await StadiumService.getAllStadiums();
      setStadiums(data);
    } catch (error) {
      console.error('Error fetching stadiums:', error);
    }
  };

  useEffect(() => {
    fetchStadiums();
  }, []);





  const handleDeleteStadium = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this stadium?');
    if (confirmDelete) {
      try {
        await StadiumService.deleteStadium(id);
        setStadiums(stadiums.filter(stadium => stadium._id !== id));
      } catch (error) {
        console.error('Error deleting stadium:', error);
      }
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium) => (
              <tr key={stadium._id}>
                <td className="py-2 px-4 border-b">{stadium.name}</td>
                <td className="py-2 px-4 border-b"> {stadium.address} </td>
                <td className="py-2 px-4 border-b">{stadium.capacity}</td>
                <td className="py-2 px-4 border-b">{stadium.isAvailable ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <Link href={`/stadium/${stadium._id}`}>
                    <button className=" text-white px-4 py-2 rounded hover:bg-blue-700 mr-2" style={{ backgroundColor: '#1B998B' }}
>
                      View
                    </button>
                  </Link>
                  <Link href={`/stadium/update/${stadium._id}`}>
                    <button className=" text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2" style={{ backgroundColor: '#0B4F6C' }} >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteStadium(stadium._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                    
                  >
                    Delete
                  </button>
                </td>
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
