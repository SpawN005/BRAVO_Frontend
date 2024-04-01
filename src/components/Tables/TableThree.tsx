"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserFromToken from '@/utilities/getUserFromToken ';
import { useForm } from 'react-hook-form';

const TeamDetails = () => {
  const [teamData, setTeamData] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPlayerPopup, setShowAddPlayerPopup] = useState(false); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: 'gardien'  });
  
const user = getUserFromToken()
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/team/team/manager/${user.userId}`);
        setTeamData(response.data[0]);
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
console.log(teamData)
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
  const toggleAddPlayerPopup = () => {
    setShowAddPlayerPopup(!showAddPlayerPopup);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleAddPlayer = async () => {
    try {
      await axios.post(`http://localhost:3001/player/assign/${teamData._id}`, formData);
      console.log('Joueur ajouté avec succès !');
  
      // Récupérer à nouveau les détails de l'équipe après l'ajout du joueur
      const response = await axios.get(`http://localhost:3001/team/team/manager/${user.userId}`);
      setTeamData(response.data[0]); // Mettre à jour l'état de l'équipe avec les nouvelles données
      setShowAddPlayerPopup(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        position: ''
      });
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };
  const handlePositionChange = (e) => {
    setFormData({
      ...formData,
      position: e.target.value
    });
  };

  return (
    <div className="max-w-full overflow-x-auto">
    <form className=" mx-1 mb-3 flex items-center justify-between">
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative flex-1 max-w-md justify-end">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search player" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    <button onClick={toggleAddPlayerPopup} className=" rounded bg-blue-700 p-2 font-normal text-white hover:bg-opacity-90    justify-items-end">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
    </button>
</form>


{/* Pop-up pour ajouter un joueur */}
{showAddPlayerPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-9 rounded-md w-150 h-80">
      <h2 className="text-black text-lg font-semibold mb-4 text-center">Ajouter un joueur</h2>
      <form>
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8">
          <div className="sm:col-span-1">
            <label  className="block text-sm font-medium text-black">Nom</label>
            <input
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              id="firstName"
              className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Nom"
              
            />
          </div>
          <div className="sm:col-span-1">
            <label  className="block text-sm font-medium leading-5 text-black">Prénom</label>
            <input
            value={formData.lastName}
            onChange={handleChange}
            type="text"
              id="lastName"
              className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Prénom"
            />
          </div>
          <div className="sm:col-span-1">
            <label  className="block text-sm font-medium leading-5 text-black">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Email"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-5 text-black">Position</label>
            <select
              value={formData.position}
              onChange={handlePositionChange}
              id="position"
              className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
              <option value="gardien">Gardien</option>
              <option value="defenseur">Défenseur</option>
              <option value="milieu">Milieu</option>
              <option value="attaquant">Attaquant</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
        <button type="button" onClick={() => setShowAddPlayerPopup(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold  py-1 px-2 mr-2 rounded">Fermer</button>
          <button type="button" onClick={handleAddPlayer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-1 px-2  rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
)}





    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {teamData ? (
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nom
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Prénom
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Position
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teamData.players.map((player) => (
                    <tr key={player._id} className="border-b">
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {player.firstName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {player.lastName}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p>
                    {player.position}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  <button onClick={() => handleUpdatePlayer(player._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button onClick={() => deletePlayer(player._id)} className="bg-red bg-red-700 text-white font-bold py-1 px-2 rounded">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <p className="text-center">Loading team details...</p>
      )}
      </div>
      {/* Pop-up pour modifier les détails du joueur */}
      {selectedPlayer && showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-100">
          <h2 className="text-lg text-center font-semibold mb-4 text-black">Edit Player</h2>
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
            <div className="mb-4">
            <label  className="block  text-sm font-medium leading-5  text-black">Poste</label>
            <select
             onChange={(e) => setSelectedPlayer({ ...selectedPlayer, position: e.target.value })}
             className='block w-full rounded-md pl-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6'
            >
              <option value="gardien">Gardien</option>
              <option value="defenseur">Défenseur</option>
              <option value="milieu">Milieu</option>
              <option value="attaquant">Attaquant</option>
            </select>         
               </div>






            
            <div className="flex justify-end">
              <button type="button" onClick={handleCancelUpdate} className=" bg-red-700 text-white font-bold py-1 px-2 mr-2 rounded">Cancel</button>
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
