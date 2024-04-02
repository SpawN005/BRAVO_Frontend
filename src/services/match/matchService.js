import axios from 'axios';
const API_URL = "http://localhost:3001/matches";

const getMatchesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};
const getMatchesById = async (matchId) => {
  try {
    const response = await axios.get(`${API_URL}/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
};
const patchMatchById = async (id, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/patch/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    console.error("Error during match patching :", error);
    throw error;
  }
};

export default { getMatchesByUserId ,patchMatchById,getMatchesById};
