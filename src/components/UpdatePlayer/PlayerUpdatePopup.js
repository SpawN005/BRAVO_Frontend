import React, { useState } from 'react';
import PlayerForm from './PlayerForm'; // Assurez-vous d'importer correctement le composant PlayerForm

const PlayerUpdatePopup = ({ player, onUpdate, onCancel }) => {
  // Utilisez l'état local pour gérer les modifications du formulaire
  const [formData, setFormData] = useState({
    firstName: player.firstName,
    lastName: player.lastName,
    email: player.email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData); // Appeler la fonction onUpdate avec les nouvelles données du formulaire
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Modifier les informations du joueur</h2>
        <PlayerForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mt-4">Annuler</button>
      </div>
    </div>
  );
};

export default PlayerUpdatePopup;
