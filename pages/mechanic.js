import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicListing from "@/components/mechanic/MechanicListing";
import MechanicTop from "@/components/mechanic/MechanicTop";
import React from "react";

const Mechanic = () => {
  const router = useRouter();
  const [query, setQuery] = useState({});

  useEffect(() => {
    // Get query parameters from the router
    const { selectedServices, location } = router.query;

    // Parse the location data if it exists
    const locationData = location ? JSON.parse(location) : {};

    // Convert selectedServices to an array of strings
    const servicesArray = selectedServices ? selectedServices.split(",") : [];

    // Set the query state
    setQuery({ selectedServices: servicesArray, location: locationData });
  }, [router.query]);

  console.log(query);

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Navbar />
      <div className="w-[90%]">
        {" "}
        <MechanicTop servicesstate title={"BOOK YOUR MECHANIC IN "} titleColor={"3 EASY STEPS!"} />
        <MechanicListing />
      </div>
      <Footer />
    </div>
  );
};

export default Mechanic;
