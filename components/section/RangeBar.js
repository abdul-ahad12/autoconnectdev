import React, { useState } from "react";

const RangeBar = ({
  mechanics,
  location,
  setLocation,
  toMechanic,
  setToMechanic,
  toCustomer,
  setToCustomer,
  handleClick
}) => {
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
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-7">
        <div className="text-primary text-[1.5rem] font-medium">
          Filter <span className="text-yellowcolor">by</span>{" "}
        </div>
        <div className="h-[2px] bg-graycolor"></div>
        <div className="text-graycolor2">Distance near you</div>
      </div>

      {/* Location input */}
      <div className="flex flex-col">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={handleChangeLocation}
          placeholder="Enter location"
        />
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
      <button className="btn-primary" onClick={handleClick}>
        Apply Filters
      </button>
    </div>
  );
};

export default RangeBar;
{
  /* <div className=" bottom-0 left-0 w-full flex flex-col justify-between text-sm text-graycolor2">
        <input
          type="range"
          min="10"
          max="35"
          step="5"
          value={value}
          onChange={handleChange}
          className={`h-1  w-full fill:bg-black ${getRangeColor()}`}
        />
        <div className="flex mt-3">
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(10)}
          >
            10KM
          </div>
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(15)}
          >
            15KM
          </div>
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(20)}
          >
            20KM
          </div>
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(25)}
          >
            25KM
          </div>
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(30)}
          >
            30KM
          </div>
          <div
            className="w-1/6 text-center cursor-pointer"
            onClick={() => handleSnapToValue(35)}
          >
            35KM
          </div>
        </div>
      </div> */
}
