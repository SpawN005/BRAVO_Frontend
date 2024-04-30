import getUserFromToken from "@/utilities/getUserFromToken ";
import axios from "axios";
import useStore from "@/store"; // Adjust the path as necessary
import { useRouter } from "next/navigation"; // Corrected import statement
const API_URL = "http://localhost:3001"; // Replace with your API URL

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { email, password });

    if (response.data) {
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      if (!accessToken || !refreshToken) {
        throw new Error("Tokens are undefined");
      }
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      const userDetails = getUserFromToken();
      console.log(userDetails);
      localStorage.setItem("userId", userDetails.userId);
      fetchUserData();
    }
    return response.data;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("selectedTournamentId");
};

const fetchUserData = async () => {
  try {
    const user = getUserFromToken();
    const response = await axios.get(`${API_URL}/users/${user.userId}`);
    if (response.data && response.data.code === 200) {
      useStore.getState().setUser(response.data.data.userIdentity);
      useStore.getState().setPermissionLevel(user.permissionLevel);
      localStorage.setItem("selectedTournamentId", "65d8c7850cf35186c1fb2640");
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
const addUserTournament = async (userId, tournamentId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/users/addtournament/${userId}`,
      { tournamentId: tournamentId },
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
const fetchSolde = async () => {
  try {
    const response = await fetch('/api/solde'); // Assuming your Express.js API endpoint is '/api/solde'
    if (!response.ok) {
      throw new Error('Failed to fetch solde');
    }
    const data = await response.json();
    return data.solde; // Assuming the response contains the 'solde' property
  } catch (error) {
    console.error('Error fetching solde:', error);
    return null;
  }
};



export default {
  register,
  login,
  logout,
  addUserTournament,
  fetchSolde,
  
};
