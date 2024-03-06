import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/section/Dashboard";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthProvider";
import axios from "axios";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userID, setuserId] = useState();
  const [userRole, setUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  console.log(userRole);

  useEffect(() => {
    const fetchData = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setuserId(id);
      setUserRole(role);

      // setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, []);

  console.log(bookings);
  useEffect(() => {
    // Define your fetch function
    const fetchBookings = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch bookings for
        const userId = userID;

        // Send GET request to the API endpoint
        const response = await axios.get(`/api/customer/bookings/${userId}`);

        // Extract the bookings data from the response
        const { bookings } = response.data;

        // Set the fetched bookings in state
        setBookings(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle error
      }
    };

    fetchBookings();

    // Call the fetch function
  }, [userID]);

  return (
    <>
      <Navbar />
      <Dashboard bookings={bookings} />
      <Footer />
    </>
  );
};

export default CustomerDashboard;
