import AboutUsInfo from "@/components/aboutUs/AboutUsInfo";
import ContactUs from "@/components/aboutUs/ContactUs";
import FAQ from "@/components/aboutUs/FAQ";
import Values from "@/components/aboutUs/Values";
import SmartApp from "@/components/home/SmartApp";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <AboutUsInfo />
      <Values />
      <SmartApp />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
