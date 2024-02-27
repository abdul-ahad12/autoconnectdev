import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

console.log(userData)


  useEffect(() => {
    const fetchData = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      if (accessToken && id && role) {
        setIsLoggedIn(true);
        setUserData({ id, role });
      }
      setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
