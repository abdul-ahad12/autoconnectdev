// lib/utils.js

import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`/api/customer`, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Update user data
export const updateUserData = async (data) => {
  try {
    const response = await axios.put(`/api/customer`, data, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
