import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your API URL

const getMatchDetails = async (matchId) => {
  try {
    const response = await axios.get(`${API_URL}/matches/${matchId}`);
    
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default {
  getMatchDetails
};
