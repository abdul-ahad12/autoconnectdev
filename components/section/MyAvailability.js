import React from "react";
import DateScroll from "./DateScroller";

const MyAvailibility = () => {
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
        <DateScroll />
      </div>
    </div>
  );
};

export default MyAvailibility;
