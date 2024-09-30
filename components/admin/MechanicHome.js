import Image from "next/image";
import React, { useEffect, useState } from "react";
import Arrow from "../../public/admin/homearrow.png";
import Users from "../../public/admin/homeusers.png";
import Graph from "../../public/admin/fullgraph.png";

import CusButton from "../section/button";

const MechanicHome = () => {
  const [stats, setStats] = useState(null);
  

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }
    fetchStats();
  }, []);
  const items = [
    {
      id: 1,
      number: stats?.totalUsers ? stats.totalUsers : 0,
      text: "Total Users",
      image: "/admin/homeusers.png",
    },
    {
      id: 2,
      number: stats?.totalMechanics ? stats.totalMechanics : 0,
      text: "Total Mechanic",
      image: "/plumber.svg",
    },
    {
      id: 3,
      number: stats?.totalBookings ? stats.totalBookings : 0,
      text: "Total Orders",
      image: "/shoppingcart.svg",
    },
  ];

  return (
    <div className="flex flex-col  gap-10 w-full ">
      <div className=" grid lg:grid-cols-3 gap-2 content-center base:mx-auto base:mt-10 lg:m-0">
        {items.map((item) => (
          <MechanicSingleHome
            key={item.id}
            number={item.number}
            name={item.text}
            image={item.image}
          />
        ))}
      </div>
      <Image
        alt="graph"
        src={Graph}
        className="border-[2px] items-center  lg:w-full border-opacity-75 rounded-lg p-8"
      />
    </div>
  );
};

export default MechanicHome;

const MechanicSingleHome = ({ number, name, image }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between border-[1px] border-opacity-70 rounded-lg p-5">
        <div className="flex flex-col gap-4">
          <div className="text-graycolor2 lg:text-[min(0.8vw,14px)] font-semibold">
            {name}
          </div>
          <p className="lg:text-[min(1.5vw,32px)] font-bold">{number}</p>
          <div className="flex gap-3">
            {/* <Image src={Arrow} alt="arrowhomemechanic" className="w-8 h-8" /> */}
            {/* <div className="text-[#EA8F95] ">
                {percentageChange}%<span> down from past week </span>
              </div> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
         <div className="border border-black border-opacity-40 rounded-lg p-2"> <img className="h-[3rem]" src={image} alt="arrowhomemechanic" /></div>
          {/* <CusButton text={"View All"} /> */}
        </div>
      </div>
    </div>
  );
};
