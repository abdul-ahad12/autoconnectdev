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
import OurCommitment from "../components/home/OurCommitment";

// const poppins = Poppins({ subsets: ['latin'] })

export default function Home() {
  // Function to fetch user details by ID

  // Usage example

  return (
    <div>
      <Navbar />
      <Hero />
      <Form />
      <CarServices />
      <OurCommitment />
      <HowAutoConnect />
      <WhyChooseAuto />
      <SmartApp />
      <YouLiveUs />
      <Footer />
    </div>
  );
}
