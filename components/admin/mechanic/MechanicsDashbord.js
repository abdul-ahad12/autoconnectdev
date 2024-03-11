import React from "react";

const MechanicsDashbord = ({ acmotors, dateofsignup, numberoforders }) => {
  return (
    <div className="grid grid-cols-4 mb-3 gap-x-28 gap-y-10 items-center border-[1px] py-6 px-10 rounded-lg">
      <button className="text-primary w-fit text-[1rem] rounded-md font-semibold">
        <span className="bg-graycolor text-graycolor2 text-[0.6rem] rounded-full p-2 border-2 font-medium mr-3">
          AC
        </span>
        {acmotors}
      </button>
      <div className="text-graycolor2 text-[min(0.8vw,14px)]">
        {dateofsignup}
      </div>
      <div className="text-graycolor2 text-[min(0.8vw,14px)]">
        {numberoforders}
      </div>
      <button className="text-primary w-fit text-[0.8rem] border-2 rounded-md p-1">
        Click here
      </button>
    </div>
  );
};

export default MechanicsDashbord;
