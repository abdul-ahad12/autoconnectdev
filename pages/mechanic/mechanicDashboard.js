import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Dashboard from '@/components/section/Dashboard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MechanicDashboard = () => {
  const [bookings, setBookings] = useState([]);
  console.log(bookings)
  useEffect(() => {
    // Define your fetch function
    const fetchBookings = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch bookings for
        const mechanicId = localStorage.getItem("mechanicId");


        // Send GET request to the API endpoint
        const response = await axios.get(`/api/mechanic/getAllOrders/${mechanicId}`);

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
        <Dashboard bookings={bookings} />
        <Footer />
    </div>
  )
}

export default MechanicDashboard