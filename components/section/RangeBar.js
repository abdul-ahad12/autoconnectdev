import React, { useState } from "react";
import { citiesAustralia, melbourneSuburbs } from "../home/Form";
import CusButton from "./button";

const RangeBar = ({
  mechanics,
  location,
  setLocation,
  toMechanic,
  setToMechanic,
  toCustomer,
  setToCustomer,
  handleClick,
}) => {
  // Array of city options

  const handleChangeLocation = (event) => {
    setLocation(event.target.value); // Update location state
  };

  const handleChangeToMechanic = () => {
    setToMechanic(!toMechanic); // Toggle TO_MECHANIC checkbox state
  };

  const handleChangeToCustomer = () => {
    setToCustomer(!toCustomer); // Toggle TO_CUSTOMER checkbox state
  };

  return (
    <div className="flex flex-col gap-9 ">
      <div className="flex flex-col gap-7">
        <div className="text-primary text-[1.5rem] font-medium">
          Filter <span className="text-yellowcolor">by</span>{" "}
        </div>
        <div className="h-[2px] bg-graycolor"></div>
        {/* <div className="text-graycolor2">Distance near you</div> */}
      </div>

      {/* Location select dropdown */}
      <div className="flex flex-col">
        <label htmlFor="location">Location</label>
        <select id="location" value={location} className="py-[0.4rem] cursor-pointer rounded-[0.7rem]"  onChange={handleChangeLocation}>
          <option value="">Select Location</option>
          {melbourneSuburbs.map((suburb) => (
            <option key={suburb} value={suburb}>
              {suburb}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes for delivery mode */}
      {/* <div className="flex flex-col gap-4">
        <div>
          {" "}
          <label htmlFor="toMechanic">To Mechanic</label>
          <input
            id="toMechanic"
            type="checkbox"
            checked={toMechanic}
            onChange={handleChangeToMechanic}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="toCustomer">To Customer</label>
          <input
            id="toCustomer"
            type="checkbox"
            checked={toCustomer}
            onChange={handleChangeToCustomer}
          />
        </div>
      </div> */}

      {/* Button */}
      <CusButton type={"primary"} text={"Apply Filters"} onClick={handleClick} />
        
      
    </div>
  );
};

export default RangeBar;
