import getUserFromToken from '@/utilities/getUserFromToken '
import axios from 'axios';
import useStore from '@/store'; // Adjust the path as necessary

const API_URL = 'http://localhost:3001'; // Replace with your API URL

const register = async (userData) => {
    console.log(userData)
  try {
    const response = await axios.post(`${API_URL}/users/create`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error during user registration:', error);
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
          throw new Error('Tokens are undefined');
        }
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        fetchUserData()
      }
      return response.data;
    } catch (error) {
      console.error('Error during user login:', error);
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
  };

  const fetchUserData = async () => {
    try {

      const user = getUserFromToken();
      const response = await axios.get(`${API_URL}/users/${user.userId}`);
      if (response.data && response.data.code === 200) {
        useStore.getState().setUser(response.data.data.userIdentity);
        useStore.getState().setPermissionLevel(user.permissionLevel);

      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  
export default {
  register,
  login,
  logout
};
