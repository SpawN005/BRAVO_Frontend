import axios from "axios";
const API_URL = "https://bravo-backend.onrender.com";

const CreateTournament = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${API_URL}/tournaments/create`, data);
    console.log("first");
    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};
const getTournaments = async () => {
  try {
    const response = await axios.get(`${API_URL}/tournaments`);

    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};
const getTournamentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tournaments/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};
const patchTournamentById = async (id, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/tournaments/patch/${id}`,
      data,
    );

    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};
const getTournamentByUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/tournaments/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};
const getTournamentStandings = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tournament/standings/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error during tournament creation:", error);
    throw error;
  }
};

// const getsolde = async (userId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/v1/user-solde/${userId}`);
//     console.log("ss"); // Fix log here

//     return response.data.solde;
//   } catch (error) {
//     throw new Error('Failed to fetch user solder');
//   }
// };

const getsolde = async (userId) => {
  try {
    const response = await axios.get(
      `https://bravo-backend.onrender.com/api/v1/user-solde/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

export default {
  CreateTournament,
  getTournaments,
  getTournamentById,
  patchTournamentById,
  getTournamentByUser,
  getTournamentStandings,
  getsolde,
};
