"use client";
import jwt_decode from "jwt-decode";

const getUserFromToken = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }
  return null;
};

export default getUserFromToken;
