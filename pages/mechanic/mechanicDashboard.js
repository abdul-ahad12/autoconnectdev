import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/section/Dashboard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MechanicDashboard = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    // Define your fetch function
    const fetchBookings = async () => {
      try {
        // Send GET request to the API endpoint
        const response = await axios.get(`/api/mechanic/getAllOrders`);

        // Extract the bookings data from the response
        const { bookings } = response.data;

        // Set the fetched bookings in state
        setBookings(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle error
      }
    };

    // Call the fetch function
    fetchBookings();
  }, []);
  return (
    <div>
      <Navbar />
      <Dashboard role={"MECHANIC"} bookings={bookings} />
      {/* <Footer /> */}
    </div>
  );
};

export default MechanicDashboard;
