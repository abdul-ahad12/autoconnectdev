import React from "react";
import CusButton from "./button";
import Image from "next/image";

const NoOrdersYet = () => {
  return (
    <div className="flex justify-between p-9 border-[1px] rounded-lg">
      <div className="flex flex-col justify-between">
        <div className="text-[1.2rem]">No Orders yet!</div>
        <div className="text-gray-300">
          Explore the various services provided by{" "}
          <span className="text-graycolor2">Auto Connect</span>
        </div>
        <button className="text-orange-300 border-graycolor border-[1px] w-fit p-1 rounded-lg">
          Explore Now
        </button>
      </div>
      <Image width={100} height={200} src="/dashboard/cart.png" alt="cart" />
    </div>
  );
};

export default NoOrdersYet;
