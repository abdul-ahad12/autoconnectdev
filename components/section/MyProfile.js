import React, { useEffect, useState } from "react";
import Description from "./Description";
import { fetchUserData } from "../../lib/utils";
import { formatDate } from "../../lib/supportingFncs";

const MyProfile = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fn = async () => {
      const response = await fetchUserData();
      setUserData(response);
    };
    fn();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] bg-white rounded-lg py-[5rem] px-[2rem]">
        {/* form */}
        <form className="w-full flex flex-col gap-6">
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <Description text={"Name"} size={"inputlabel"} />
              <div>
                <input
                  value={userData?.name}
                  className="input-class border border-gray-400"
                />
              </div>
            </div>
            {/* <div className="w-full">
              <Description text={"LastName"} size={"inputlabel"} />
              <div>
                <input className="input-class border border-gray-400" />
              </div>
            </div> */}
          </div>
          <div>
            <Description text={"Email Address"} size={"inputlabel"} />
            <div>
              <input
                value={userData?.email}
                className="input-class border border-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <Description text={"Phone Number"} size={"inputlabel"} />
              <div>
                <input
                  value={userData?.phoneNumber}
                  className="input-class border border-gray-400"
                />
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
            <Description text={"Account Created On"} size={"inputlabel"} />
            <div>
              <input
                value={formatDate(userData?.createdAt)}
                className="input-class border border-gray-400"
              />
            </div>
          </div>
        </form>

        {/* <div className="text-secondary font-semibold text-[1.2rem] py-14 cursor-pointer">
          Forgot Password ?
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
