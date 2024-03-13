"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerUpdateForm = ({ playerId, onUpdateSuccess, onCancelUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/player/${playerId}`);
        const playerData = response.data;
        setFormData({
          firstName: playerData.firstName,
          lastName: playerData.lastName,
          email: playerData.email
        });
      } catch (error) {
        console.error('Error fetching player details:', error);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

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
      const response = await axios.put(`http://localhost:3001/player/${playerId}`, formData);
      onUpdateSuccess(response.data); // Appel de la fonction de succès de mise à jour
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  return (
    <div>
      <h2>Update Player Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancelUpdate}>Cancel</button>
      </form>
    </div>
  );
};

export default PlayerUpdateForm;
