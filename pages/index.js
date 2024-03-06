import Image from "next/image";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import CarServices from "@/components/home/CarServices";
import HowAutoConnect from "@/components/home/HowAutoConnect";
import WhyChooseAuto from "@/components/home/WhyChooseAuto";
import SmartApp from "@/components/home/SmartApp";
import YouLiveUs from "@/components/home/YouLiveUs";
import Hero from "@/components/home/Hero";
import Form from "@/components/home/Form";
import Footer from "@/components/layout/Footer";
// import { parseCookies } from "nookies";
import { useEffect } from "react";
import axios from "axios";

// const poppins = Poppins({ subsets: ['latin'] })

export default function Home() {
  // Function to fetch user details by ID
  const fetchUserDetailsById = async () => {
    try {
      // Retrieve access token from cookies

      // Set up headers with the access token
      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      // };

      // Make GET request to the API endpoint with headers
      const response = await axios.get("/api/auth/getDetailsById", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Send cookies with the request
      });

      // Return the user details from the response
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching user details:", error);
      throw error; // Optionally, you can handle errors differently or return a default value
    }
  };

  useEffect(() => {
    return () => {
      fetchUserDetailsById()
        .then((userDetails) => {
          console.log("User details:", userDetails);
          // Do something with the user details
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    };
  }, []);

  // Usage example

  return (
    <div>
      <Navbar />
      <Hero />
      <Form />
      <CarServices />
      <HowAutoConnect />
      <WhyChooseAuto />
      <SmartApp />
      <YouLiveUs />
      <Footer />
    </div>
  );
}
