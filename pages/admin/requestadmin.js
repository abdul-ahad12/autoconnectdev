import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AdminDashboard from "@/components/section/AdminDashboard";
import React, { useState } from "react";

const RequestAdmin = () => {
  const [bookings, setBookings] = useState([]);

  return (
    <div>
      <Navbar />
      {/* <Dashboard bookings={bookings} /> */}
      <AdminDashboard bookings={bookings} />
      <Footer />
    </div>
  );
};

export default RequestAdmin;
