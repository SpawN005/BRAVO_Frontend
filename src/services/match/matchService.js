import axios from "axios";

const getMatchesByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `https://bravo-backend.onrender.com/matches/user/${userId}`,
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
      `https://bravo-backend.onrender.com/matches/bracket/${tournamentId}`,
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
      `https://bravo-backend.onrender.com/matches/matches/${tournamentId}`,
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
      `https://bravo-backend.onrender.com/matches/team/${matchId}`,
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
      `https://bravo-backend.onrender.com/matches/patch/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    console.error("Error during match patching :", error);
    throw error;
  }
};
const finishLeague = async (id) => {
  try {
    const response = await axios.get(
      `https://bravo-backend.onrender.com/matches/goupknockout/gettopteams/${id}`,
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
  finishLeague,
};
