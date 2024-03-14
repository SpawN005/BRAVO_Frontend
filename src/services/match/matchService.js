import axios from 'axios';

const getMatchesByUserId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/matches/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export default { getMatchesByUserId };
