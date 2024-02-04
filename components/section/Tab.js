import React from 'react'

const Tab = ({ title, icons, statefn, state }) => {
    return (
      <div
        onClick={() => {
          statefn(title);
        }}
        className="flex justify-between gap-[6vw] w-full py-3 cursor-pointer"
      >
        <div className="flex gap-3">
          <img className="w-8" src={icons} />
          <div
            className={`text-black text-[1.2rem] ${
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

export default Tab