import axios from "axios";

const getMatchesByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/matches/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};
const getBracket = async (tournamentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/matches/bracket/${tournamentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};
const getMatchesByTournament = async (tournamentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/matches/matches/${tournamentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};
const getMatchesById = async (matchId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/matches/team/${matchId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching match:", error);
    throw error;
  }
};
const patchMatchById = async (id, data) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/matches/patch/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    console.error("Error during match patching :", error);
    throw error;
  }
};

export default {
  getMatchesByUserId,
  getBracket,
  getMatchesByTournament,
  patchMatchById,
  getMatchesById,
};
