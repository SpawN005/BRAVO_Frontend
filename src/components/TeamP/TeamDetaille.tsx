"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamDetails = () => {
  const [teamData, setTeamData] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // État pour afficher la pop-up d'édition

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/team/team/65df4a77413766bede36e741');
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, []);

  const deletePlayer = async (playerId) => {
    try {
      await axios.delete(`http://localhost:3001/player/${playerId}`);
      setTeamData(prevTeamData => ({
        ...prevTeamData,
        players: prevTeamData.players.filter(player => player._id !== playerId)
      }));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleUpdatePlayer = async (playerId) => {
    try {
      const response = await axios.get(`http://localhost:3001/player/${playerId}`);
      setSelectedPlayer(response.data); // Stocker les détails du joueur sélectionné dans l'état
      setShowEditPopup(true); // Afficher la pop-up d'édition
    } catch (error) {
      console.error('Error fetching player details:', error);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedPlayer(null); // Réinitialiser les détails du joueur sélectionné
    setShowEditPopup(false); // Cacher la pop-up d'édition
  };

  const handleSavePlayer = async (updatedPlayerData) => {
    try {
      await axios.put(`http://localhost:3001/player/${selectedPlayer._id}`, updatedPlayerData);
  console.log(updatedPlayerData)
      // Mettre à jour les détails du joueur dans l'état local
      setTeamData(prevTeamData => ({
        ...prevTeamData,
        players: prevTeamData.players.map(player =>
          player._id === selectedPlayer._id ? { ...player, ...updatedPlayerData } : player
        )
      }));
      setShowEditPopup(false); 
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      {teamData ? (
        <div className="w-242.5 mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <img src={`http://localhost:3001/uploads/1708437605158.png`} alt="Team Logo" className="w-16 h-16 rounded-full" />
              <h2 className="text-xl font-semibold ml-4">{teamData.name}</h2>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Players:</h3>
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
                        <button onClick={() => handleUpdatePlayer(player._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded">Modifier</button>
                        <button onClick={() => deletePlayer(player._id)} className="bg-red hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading team details...</p>
      )}

      {/* Pop-up pour modifier les détails du joueur */}
      {selectedPlayer && showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-100">
          <h2 className="text-lg font-semibold mb-4">Edit Player</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={selectedPlayer.firstName} onChange={(e) => setSelectedPlayer({ ...selectedPlayer, firstName: e.target.value })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={selectedPlayer.lastName} onChange={(e) => setSelectedPlayer({ ...selectedPlayer, lastName: e.target.value })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">email:</label>
              <input type="text" id="email" name="email" value={selectedPlayer.email} onChange={(e) => setSelectedPlayer({ ...selectedPlayer, email: e.target.value })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleCancelUpdate} className="bg-red hover:bg-gray-700 text-white font-bold py-1 px-2 mr-2 rounded">Cancel</button>
              <button type="button" onClick={() => handleSavePlayer(selectedPlayer)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default TeamDetails;
