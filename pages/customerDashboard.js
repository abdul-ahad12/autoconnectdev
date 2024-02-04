import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/section/Dashboard";
import Description from "@/components/section/Description";
import MyProfile from "@/components/section/MyProfile";
import MyVehicles from "@/components/section/MyVehicles";
import OrdersList from "@/components/section/OrderList";
import Tab from "@/components/section/Tab";
import CusButton from "@/components/section/button";
import React, { useState } from "react";

const CustomerDashboard = () => {


  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
};

export default CustomerDashboard;
