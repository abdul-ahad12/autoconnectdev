import React from "react";
import DateScroll from "./DateScroller";
import MechanicServices from "../mechanic/MechanicServices";

const MyServices = () => {
  const content = [
    {
      title: "Honda City",
      model: "Petrol 2022 Model",
    },
    {
      title: "Honda City",
      model: "Petrol 2022 Model",
    },
  ];
  return (
    <div className="w-full flex ">
      <div className="lg:w-[100%] flex flex-col gap-6">
        <MechanicServices />
      </div>
    </div>
  );
};

export default MyServices;
