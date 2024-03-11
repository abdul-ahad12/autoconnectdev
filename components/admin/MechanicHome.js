import Image from "next/image";
import React from "react";
import Arrow from "../../public/admin/homearrow.png";
import Users from "../../public/admin/homeusers.png";
import Graph from "../../public/admin/fullgraph.png";

import CusButton from "../section/button";

const MechanicHome = () => {
  const items = [
    { id: 1, totalUsers: 3234, percentageChange: -3.5 },
    { id: 2, totalUsers: 4000, percentageChange: 2.5 },
    { id: 3, totalUsers: 2800, percentageChange: -1.2 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <MechanicSingleHome
            key={item.id}
            totalUsers={item.totalUsers}
            percentageChange={item.percentageChange}
          />
        ))}
      </div>
      <Image
        alt="graph"
        src={Graph}
        className="border-[2px] w-full border-opacity-75 rounded-lg p-8"
      />
    </div>
  );
};

export default MechanicHome;

const MechanicSingleHome = ({ totalUsers, percentageChange }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between border-[1px] border-opacity-70 rounded-lg p-5">
        <div className="flex flex-col gap-4">
          <div className="text-graycolor2 lg:text-[min(0.8vw,14px)] font-semibold">
            Total Users
          </div>
          <p className="lg:text-[min(1.5vw,32px)] font-bold">{totalUsers}</p>
          <div className="flex gap-3">
            <Image src={Arrow} alt="arrowhomemechanic" className="w-8 h-8" />
            <div className="text-[#EA8F95] ">
              {percentageChange}%<span> down from past week </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Image src={Users} alt="arrowhomemechanic" />
          <CusButton text={"View All"} />
        </div>
      </div>
    </div>
  );
};
