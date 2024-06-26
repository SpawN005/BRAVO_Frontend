// observerService.js
"use client";
import axios from "axios";

const API_URL = "https://bravo-backend.onrender.com"; // Replace with your API URL

const getObservers = async () => {
  try {
    const response = await axios.get(`${API_URL}/observers`);
    return response.data;
  } catch (error) {
    console.error("Error during fetching observers:", error);
    throw error;
  }
};
const getObserversByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/availableobservers/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error during fetching observers by date:", error);
    throw error;
  }
};
const getAllObservers = async () => {
  const tournamentId = localStorage.getItem("selectedTournamentId"); // Retrieve tournamentId from local storage
  if (!tournamentId) {
    throw new Error("No tournamentId found in local storage");
  }
  console.log("Fetching observers for tournament:", tournamentId);
  try {
    const response = await axios.get(`${API_URL}/observers/${tournamentId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during fetching observers:", error);
    throw error;
  }
};

const addObserver = async (userData) => {
  console.log("Adding new observer:", userData);
  try {
    const response = await axios.post(`${API_URL}/person/new`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during observer addition:", error);
    throw error;
  }
};

const updateObserver = async (userId, updatedData) => {
  console.log("Updating observer:", userId);
  try {
    const response = await axios.patch(
      `${API_URL}/users/${userId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error("Error during observer update:", error);
    throw error;
  }
};

const getObserverById = async (observerId) => {
  console.log("Fetching observer by ID:", observerId);
  try {
    const response = await axios.get(`${API_URL}/users/${observerId}`);
    return response.data;
  } catch (error) {
    console.error("Error during fetching observer by ID:", error);
    throw error;
  }
};

const deleteObserver = async (observerId) => {
  console.log("Deleting observer:", observerId);
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem("accessToken");

    // Configure headers for the request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${API_URL}/users/${observerId}`,
      config,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during observer deletion:", error);
    throw error;
  }
};

export default {
  getObservers,
  getObserversByDate,
  addObserver,
  updateObserver,
  getAllObservers,
  getObserverById,
  deleteObserver,
};
