// services/stadium/stadiumService.js
const API_BASE_URL = 'http://localhost:3001';

const StadiumService = {
  cachedStadiums: [],

  getAllStadiums: async () => {
    try {
      if (StadiumService.cachedStadiums.length === 0) {
        const response = await fetch(`${API_BASE_URL}/stadiums`);
        const data = await response.json();
        StadiumService.cachedStadiums = data;
      }

      return StadiumService.cachedStadiums;
    } catch (error) {
      console.error('Error fetching stadiums:', error);
      throw error;
    }
  },
  getStadiumById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stadiums/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stadium by ID:', error);
      throw error;
    }
  },

  createStadium: async (newStadium) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stadiums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStadium),
      });

      if (response.ok) {
        const addedStadium = await response.json();
        console.log(addedStadium)
        StadiumService.cachedStadiums.push(addedStadium);
        return addedStadium;
      } else {
        console.error('Error adding stadium:', response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error adding stadium:', error);
      throw error;
    }
  },
  updateStadium: async (id, updatedStadium) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stadiums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStadium),
      });

      if (response.ok) {
        const updatedStadium = await response.json();
        const index = StadiumService.cachedStadiums.findIndex(stadium => stadium._id === id);
        StadiumService.cachedStadiums[index] = updatedStadium;
        return updatedStadium;
      } else {
        console.error('Error updating stadium:', response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error updating stadium:', error);
      throw error;
    }
  },

  deleteStadium: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stadiums/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        StadiumService.cachedStadiums = StadiumService.cachedStadiums.filter(stadium => stadium._id !== id);
      } else {
        console.error('Error deleting stadium:', response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error deleting stadium:', error);
      throw error;
    }
  },



  
};

export default StadiumService;
