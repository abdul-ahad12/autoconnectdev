import { Input } from "postcss";
import React from "react";

const MechanicInfo = () => {
  return (
    <div>
      <div className="pb-9 font-semibold text-[20px]">Mechanic Information</div>
      <div className=" grid grid-cols-2 grid-rows-6 gap-x-6 gap-y-6">
        <div className="col-start-1 row-start-1  w-full">
          <InputInfo label={"First Name"} />
        </div>
        <div className="col-start-2 row-start-1">
          <InputInfo label={"Last Name"} />
        </div>
        <div className="col-start-1 row-start-2">
          <InputInfo label={"Email"} />
        </div>
        <div className="col-start-2 row-start-2">
          <InputInfo label={"Phone"} />
        </div>
        <div className="col-start-1 col-end-3 row-start-3">
          <InputInfo label={"About Us"} />
        </div>
        <div className="col-start-1 row-start-4">
          <InputInfo label={"Street"} />
        </div>
        <div className="col-start-2 row-start-4">
          <InputInfo label={"Suburb"} />
        </div>
        <div className="col-start-1 row-start-5">
          <InputInfo label={"State"} />
        </div>
        <div className="col-start-2 row-start-5">
          <InputInfo label={"Pincode"} />
        </div>
        <div className="col-start-1 col-end-3 row-start-6">
          <InputInfo label={"Link"} />
        </div>
      </div>
    </div>
  );
};

export default MechanicInfo;
// input

const InputInfo = ({ label }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="border-graycolor2 border-[1px] rounded-lg p-3" />
    </div>
  );
};
