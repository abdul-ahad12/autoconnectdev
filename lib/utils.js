import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`/api/customer`, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
