import React, { useState } from "react";

const RangeBar = () => {
  const [value, setValue] = useState(15); // Default value changed to 15
  console.log(value);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
  };

  const handleSnapToValue = (snapValue) => {
    setValue(snapValue);
  };

  const getRangeColor = () => {
    if (value <= 10) {
      return "bg-red-";
    } else if (value <= 20) {
      return "bg-orange-";
    } else {
      return "bg-green-50";
    }
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

      <div className=" bottom-0 left-0 w-full flex flex-col justify-between text-sm text-graycolor2">
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
      </div>
    </div>
  );
};

export default RangeBar;
