import Aboutusinfo from "@/components/aboutus/Aboutusinfo";
import ContactUs from "@/components/aboutus/ContactUs";
import FAQ from "@/components/aboutus/FAQ";
import Values from "@/components/aboutus/Values";
import SmartApp from "@/components/home/SmartApp";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const Aboutus = () => {
  return (
    <div>
      <Navbar />
      <Aboutusinfo />
      <Values />
      <SmartApp />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Aboutus;
