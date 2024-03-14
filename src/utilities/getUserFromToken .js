import jwt_decode from "jwt-decode";

const getUserFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }
  return null;
};


export default getUserFromToken;