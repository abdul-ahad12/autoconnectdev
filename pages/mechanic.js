import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicListing from "@/components/mechanic/MechanicListing";
import MechanicTop from "@/components/mechanic/MechanicTop";
import React from "react";
import axios from "axios"

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
  const [mechanics, setMechanics] = useState([]);

  console.log(mechanics)

  useEffect(() => {
    // Function to fetch mechanics data
    const fetchMechanics = async () => {
      try {
        // Make GET request to your API endpoint
        const response = await axios.get('/api/customer/findallmechanics');

        // Set mechanics state with the data received
        setMechanics(response.data.mechanics);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    // Call the fetchMechanics function when the component mounts
    fetchMechanics();

    // Cleanup function (optional)
    return () => {
      // Cleanup code (if needed)
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Navbar />
      <div className="w-[90%]">
        {" "}
        <MechanicTop servicesstate title={"BOOK YOUR MECHANIC IN "} titleColor={"3 EASY STEPS!"} services={query?.selectedServices} />
        <MechanicListing mechanics={mechanics} />
      </div>
      <Footer />
    </div>
  );
};

export default Mechanic;
