// components/Stadium/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import StadiumService, { Stadium } from "@/services/stadium/stadiumService";
import Link from "next/link";

const StadiumList: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);

  const fetchStadiums = async () => {
    try {
      const data = await StadiumService.getAllStadiums();
      setStadiums(data);
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    }
  };

  useEffect(() => {
    fetchStadiums();
  }, []);

  const handleDeleteStadium = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stadium?",
    );
    if (confirmDelete) {
      try {
        await StadiumService.deleteStadium(id);
        setStadiums(stadiums.filter((stadium) => stadium._id !== id));
      } catch (error) {
        console.error("Error deleting stadium:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Stadiums</h1>

      {/* Stadium List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Location</th>
              <th className="border-b px-4 py-2">Capacity</th>
              <th className="border-b px-4 py-2">Available</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium) => (
              <tr key={stadium._id}>
                <td className="border-b px-4 py-2">{stadium.name}</td>
                <td className="border-b px-4 py-2"> {stadium.address} </td>
                <td className="border-b px-4 py-2">{stadium.capacity}</td>
                <td className="border-b px-4 py-2">
                  {stadium.isAvailable ? "Yes" : "No"}
                </td>
                <td className="flex space-x-2 border-b px-4 py-2">
                  <Link href={`/stadium/${stadium._id}`}>
                    <button
                      className=" mr-2 rounded px-4 py-2 text-white hover:bg-green-500"
                      style={{ backgroundColor: "#1B998B" }}
                    >
                      View
                    </button>
                  </Link>
                  <Link href={`/stadium/update/${stadium._id}`}>
                    <button
                      className=" mr-2 rounded px-4 py-2 text-white hover:bg-yellow-700"
                      style={{ backgroundColor: "#0B4F6C" }}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteStadium(stadium._id)}
                    className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
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
          <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-500">
            Add Stadium
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StadiumList;
