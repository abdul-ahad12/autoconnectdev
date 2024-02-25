import React, { useState } from "react";

const RangeBar = () => {
  const [value, setValue] = useState(5);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
  };

  const handleSnapToValue = (snapValue) => {
    setValue(snapValue);
  };
  const getRangeColor = () => {
    if (value <= 2) {
      return "bg-red-";
    } else if (value <= 5) {
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
      {/* <input type="range" /> */}

      <div className=" bottom-0 left-0 w-full flex flex-col justify-between text-sm text-graycolor2">
        <input
          type="range"
          min="2"
          max="7"
          step="1"
          value={value}
          onChange={handleChange}
          className={`h-1  w-full fill:bg-black ${getRangeColor()}`}
        />
        <div className="flex mt-3">
          <div
            className="w-1/3 text-center cursor-pointer"
            onClick={() => handleSnapToValue(2)}
          >
            2KM
          </div>
          <div
            className="w-1/3 text-center cursor-pointer"
            onClick={() => handleSnapToValue(5)}
          >
            5KM
          </div>
          <div
            className="w-1/3 text-center cursor-pointer"
            onClick={() => handleSnapToValue(7)}
          >
            7KM
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeBar;
