import React from "react";
import Description from "./Description";

const MyProfile = () => {
  return (
    <div className="flex w-full justify-center text-[0.9rem] lg:text-[1rem]">
      <div className="lg:w-[80%] bg-white rounded-lg py-[5rem] lg:px-[2rem]">
        {/* form */}
        <form className="w-full flex flex-col gap-6">
          <div className="flex lg:flex-row base:flex-col gap-2 w-full">
            <div className="w-full">
              <Description text={"FirstName"} size={"inputlabel"} />
              <div>
                <input className="input-class border border-gray-400" />
              </div>
            </div>
            <div className="w-full">
              <Description text={"LastName"} size={"inputlabel"} />
              <div>
                <input className="input-class border border-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <Description text={"Email Address"} size={"inputlabel"} />
            <div>
              <input className="input-class border border-gray-400" />
            </div>
          </div>
          <div className="flex lg:flex-row base:flex-col gap-2 w-full">
            <div className="w-full">
              <Description text={"Phone Number"} size={"inputlabel"} />
              <div>
                <input className="input-class border border-gray-400" />
              </div>
            </div>
            <div className="w-full">
              <Description text={"Alternate"} size={"inputlabel"} />
              <div>
                <input className="input-class border border-gray-400" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Description text={"Email Address"} size={"inputlabel"} />
            <div>
              <input className="input-class border border-gray-400" />
            </div>
          </div>
        </form>

        <div className="text-secondary font-semibold base:text-[0.8rem] lg:text-[1.2rem] py-14 cursor-pointer">
          Forgot Password ?
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
