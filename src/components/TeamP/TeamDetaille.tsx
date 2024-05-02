"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserFromToken from "@/utilities/getUserFromToken ";

const TeamDetails = () => {
  const userDetails = getUserFromToken();
  const [teamData, setTeamData] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // État pour afficher la pop-up d'édition

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `https://bravo-backend.onrender.com/team/team/${userDetails}`,
        );
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, []);

  const deletePlayer = async (playerId) => {
    try {
      await axios.delete(
        `https://bravo-backend.onrender.com/player/${playerId}`,
      );
      setTeamData((prevTeamData) => ({
        ...prevTeamData,
        players: prevTeamData.players.filter(
          (player) => player._id !== playerId,
        ),
      }));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleUpdatePlayer = async (playerId) => {
    try {
      const response = await axios.get(
        `https://bravo-backend.onrender.com/player/${playerId}`,
      );
      setSelectedPlayer(response.data); // Stocker les détails du joueur sélectionné dans l'état
      setShowEditPopup(true); // Afficher la pop-up d'édition
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedPlayer(null); // Réinitialiser les détails du joueur sélectionné
    setShowEditPopup(false); // Cacher la pop-up d'édition
  };

  const handleSavePlayer = async (updatedPlayerData) => {
    try {
      await axios.put(
        `https://bravo-backend.onrender.com/player/${selectedPlayer._id}`,
        updatedPlayerData,
      );
      console.log(updatedPlayerData);
      // Mettre à jour les détails du joueur dans l'état local
      setTeamData((prevTeamData) => ({
        ...prevTeamData,
        players: prevTeamData.players.map((player) =>
          player._id === selectedPlayer._id
            ? { ...player, ...updatedPlayerData }
            : player,
        ),
      }));
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {teamData ? (
        <div className="mx-auto w-242.5">
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <img
                src={`https://bravo-backend.onrender.com/uploads/1708437605158.png`}
                alt="Team Logo"
                className="h-16 w-16 rounded-full"
              />
              <h2 className="ml-4 text-xl font-semibold">{teamData.name}</h2>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Players:</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">First Name</th>
                    <th className="text-left">Last Name</th>
                    <th className="text-left">Position</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.players.map((player) => (
                    <tr key={player._id} className="border-b">
                      <td className="py-2">{player.firstName}</td>
                      <td className="py-2">{player.lastName}</td>
                      <td className="py-2">{player.position}</td>

                      <td className="py-2 text-right">
                        <button
                          onClick={() => handleUpdatePlayer(player._id)}
                          className="mr-2 rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-500"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => deletePlayer(player._id)}
                          className="bg-red rounded px-2 py-1 font-bold text-white hover:bg-red-700"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading team detail...</p>
      )}

      {/* Pop-up pour modifier les détails du joueur */}
      {selectedPlayer && showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-100 rounded-md bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Edit Player</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={selectedPlayer.firstName}
                  onChange={(e) =>
                    setSelectedPlayer({
                      ...selectedPlayer,
                      firstName: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={selectedPlayer.lastName}
                  onChange={(e) =>
                    setSelectedPlayer({
                      ...selectedPlayer,
                      lastName: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={selectedPlayer.email}
                  onChange={(e) =>
                    setSelectedPlayer({
                      ...selectedPlayer,
                      email: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelUpdate}
                  className="bg-red mr-2 rounded px-2 py-1 font-bold text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSavePlayer(selectedPlayer)}
                  className="rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
