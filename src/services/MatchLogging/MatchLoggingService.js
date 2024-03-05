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

const scoreGoal = async (matchId, idplayer1, idplayer2, idteam) => {
  try {
    const matchId= "65e5c560c17097502c672541"

    const response = await axios.post(`${API_URL}/match-stats/score/${matchId}`, { idplayer1, idplayer2, idteam });
    console.log(first)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a yellow card
const addYellowCard = async (matchId, idplayer, idteam) => {
  try {
    const response = await axios.post(`${API_URL}/yellow-card/${matchId}`, { idplayer, idteam });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default {
  scoreGoal,
  addYellowCard,
  getMatchDetails
};
