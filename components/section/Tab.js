import React from "react";

const Tab = ({ title, icons, statefn, state }) => {
  return (
    <div
      onClick={() => {
        statefn(title);
      }}
      className="flex justify-between base:gap-16 lg:gap-[2vw] w-full py-3 cursor-pointer"
    >
      <div className="flex gap-2">
        <img className="base:w-5 lg:w-5" src={icons} />
        <div
          className={`text-black base:text-[0.9rem] lg:text-[1rem] ${
            state == title && "font-semibold"
          }`}
        >
          {title}
        </div>
      </div>
      <img className="self-center" src="/icons/arrowright.svg" />
    </div>
  );
};

export default Tab;
