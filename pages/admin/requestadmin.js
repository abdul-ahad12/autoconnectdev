import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/section/Dashboard";
import AdminDashboard from "@/components/section/AdminDashboard";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RequestAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/roles/admin", {
          withCredentials: true,
        });
        const data = response.data;
        if (data.success) {
          setIsAdmin(true);
        } else {
          router.push("/login"); // Redirect to login page if not authorized
          alert("Not Authorized");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  // const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/getAllOrders");
        const { orders, totalCount } = response.data;
        setBookings(orders);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

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
