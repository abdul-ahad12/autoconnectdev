import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicListing from "@/components/mechanic/MechanicListing";
import MechanicTop from "@/components/mechanic/MechanicTop";
import React from "react";

const Mechanic = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
          <Navbar />
      <div className="w-[90%]">
      
        {" "}
        <MechanicTop servicesstate title={'BOOK YOUR MECHANIC IN '} titleColor={"3 EASY STEPS!"} />
        <MechanicListing />
      </div>
      <Footer />
    </div>
  );
};

export default Mechanic;
