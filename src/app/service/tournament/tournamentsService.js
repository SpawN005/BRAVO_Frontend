import axios from "axios";
const API_URL = "http://localhost:3001";

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

export default {
  CreateTournament,
  getTournaments,
  getTournamentById,
  patchTournamentById,
};
