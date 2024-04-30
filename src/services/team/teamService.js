/* eslint-disable no-console */
import axios from "axios";
const API_URL = "http://localhost:3001/team";

export const getTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/teams`);

    return response.data;
  } catch (error) {
    console.error("Error during tournament fetch:", error);
    throw error;
  }
};

const getTeamById = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL}/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};
export const getTeamInfo = (callback) => {
  axios
    .get("http://localhost:3001/team/team/65da70b9d228792b5811e469")
    .then((team) => {
      callback(team.data);
    })
    .catch((err) => console.error(err));
};

export const getTeamPlayers = (callback) => {
  axios
    .get("http://localhost:3001/team/team/65da70b9d228792b5811e469")
    .then((players) => {
      callback(players.data);
    })
    .catch((err) => console.error(err));
};

export const getPlayerStats = (id, callback) => {
  axios
    .get(`http://localhost:3001/player/${id}`)
    .then((player) => {
      callback(player.data);
    })
    .catch((err) => console.error(err));
};
export default { getTeams,getTeamById };
