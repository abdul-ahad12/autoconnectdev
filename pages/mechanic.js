import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicListing from "@/components/mechanic/MechanicListing";
import MechanicTop from "@/components/mechanic/MechanicTop";
import React from "react";
import axios from "axios";

const Mechanic = () => {
  const router = useRouter();
  const [query, setQuery] = useState({});
  const [location, setLocation] = useState(""); // State for location input
  const [toMechanic, setToMechanic] = useState(true); // State for TO_MECHANIC checkbox
  const [toCustomer, setToCustomer] = useState(false); // State for TO_CUSTOMER checkbox

  const handleClick = async () => {
    try {
      // Construct the query parameters based on the current state
      const queryParams = {
        services: query.selectedServices.join(","),
        location: location,
        deliveryMode: [],
        page: 1,
        limit: 10,
      };

      // Add selected delivery modes to the query parameters array
      if (toMechanic) queryParams.deliveryMode.push("TO_MECHANIC");
      if (toCustomer) queryParams.deliveryMode.push("TO_CUSTOMER");

      // Make GET request to fetch mechanics with updated filters
      const response = await axios.get("/api/customer/findallmechanics", {
        params: queryParams,
      });

      // Update the mechanics state with the new data
      setMechanics(response.data.mechanics);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

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

  
  const [mechanics, setMechanics] = useState([]);

  

  useEffect(() => {
    
    // Extract query parameters
    const location = query?.location?.location ? query?.location?.location : "";
    const selectedServices = query.selectedServices;

    // Function to fetch mechanics data
    const fetchMechanics = async () => {
      try {
        // Make GET request to your API endpoint
        const response = await axios.get("/api/customer/findallmechanics", {
          params: {
            location: location,
            services: selectedServices.join(","), // Join array of services into a comma-separated string
            // deliveryMode: JSON.stringify(["TO_MECHANIC"]),
            page: 1, // Specify the page number
            limit: 10, // Specify the limit
          },
        });

        setMechanics(response.data.mechanics);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      }
    };

    // Call the fetchMechanics function when the component mounts
    fetchMechanics();

    // Cleanup function (optional)
    return () => {
      // Cleanup code (if needed)
    };
  }, [query]); // Include 'query' in the dependency array to trigger the effect when the query changes

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Navbar />
      <div className="w-[90%]">
        {" "}
        <MechanicTop
          servicesstate
          title={"BOOK YOUR MECHANIC IN "}
          titleColor={"3 EASY STEPS!"}
          services={query?.selectedServices}
        />
        <MechanicListing
          location={location}
          setLocation={setLocation}
          toMechanic={toMechanic}
          setToMechanic={setToMechanic}
          toCustomer={toCustomer}
          setToCustomer={setToCustomer}
          mechanics={mechanics}
          handleClick={handleClick}
          selectedServices={query.selectedServices}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Mechanic;
