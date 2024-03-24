import React from "react";

const MechanicsDashbord = ({ acmotors, dateofsignup, numberoforders }) => {
  return (
    <div className=" grid base:grid-cols-2 lg:grid-cols-4 mb-3 base:gap-4 lg:gap-x-28 lg:gap-y-10 items-center border-[1px] base:p-4 lg:py-6 lg:px-10 rounded-lg">
      <button className="text-primary w-fit text-[1rem] rounded-md font-semibold">
        <span className="bg-graycolor text-graycolor2 text-[0.6rem] rounded-full p-2 border-2 font-medium mr-3">
          AC
        </span>
        {acmotors}
      </button>
      <div className="text-graycolor2 text-[min(3vw,19px)] lg:text-[min(0.8vw,14px)]  base:ml-10 lg:ml-0">
        {dateofsignup}
      </div>
      <div className="text-graycolor2  text-[min(4vw,19px)] lg:text-[min(0.8vw,14px)]">
        {numberoforders}
      </div>
      <button className="text-primary w-fit text-[min(3vw,19px)]  lg:text-[0.8rem] border-2 rounded-md p-1 base:ml-10 lg:ml-0">
        Click here
      </button>
    </div>
  );
};

export default MechanicsDashbord;
