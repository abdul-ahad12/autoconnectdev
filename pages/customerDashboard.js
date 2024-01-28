import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Description from "@/components/section/Description";
import CusButton from "@/components/section/button";
import React, { useState } from "react";

const CustomerDashboard = () => {
  const [current, setcurrent] = useState("Orders");

  const tabs = [
    {
      title: "My Profile",
      icons: "/icons/profile.svg",
    },
    {
      title: "Orders",
      icons: "/icons/profile.svg",
    },
    {
      title: "My Vehicles",
      icons: "/icons/profile.svg",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center bg-white overflow-hidden">
        <div className="w-[90%] flex pt-[3rem] gap-[2rem]">
          {/* left bar */}
          <div className="w-[25%] flex items-center flex-col h-[90vh]  justify-between rounded-lg border border-graycolor2 p-7  ">
            <div className="text-secondary text-[min(1.7rem,1.7vw)] font-semibold h-[15%]">
              Dashboard
            </div>
            <div className="flex flex-col w-full gap-1 mb-[25vh]">
              {tabs.map((data, idx) => {
                return (
                  <Tab
                    key={idx}
                    title={data.title}
                    icons={data.icons}
                    statefn={setcurrent}
                    state={current}
                  />
                );
              })}
            </div>
            <CusButton type={"primary"} text={"Sign Out"} />
          </div>

          {/* right */}
          <div className="w-[80%] pb-[40vh] relative">
            {current == "Orders" && <OrdersList />}
            {current == "My Profile" && <MyProfile />}
            {current == "My Vehicles" && <MyVehicles />}
            <img className="absolute bottom-0 right-[-10%] w-[80%]" src="/mechanic/bgmech.svg" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerDashboard;

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

const OrdersList = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex-col flex gap-5">
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <div className="p-[1.2rem] w-full bg-white rounded-lg flex flex-col border-gray-300 border  z-50">
      <div className="w-full  flex justify-between items-center">
        <div className="text-[1.3rem]">Order #2416</div>
        <div className="flex gap-2">
          <div className="flex items-center rounded-md border border-gray-500 gap-2 px-2 py-1">
            <div className="w-1 h-1 bg-red-600" />
            <div>Await payment</div>
          </div>
          <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2">
            <div className="w-1 h-1 bg-blue-700" />
            <div>Await delivery</div>
          </div>
          <div className="flex justify-center items-center rounded-md border-gray-500 border">
            <img src="/icons/dotted.png" />
          </div>
        </div>
      </div>
      <div className="my-2 flex gap-3 items-center">
        <div>Aug 17, 2024, 2:56:31 PM</div>
        <div>from</div>
        <div className="font-medium">AC Motors</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col my-6">
          <div className="font-medium text-[1rem]">Isra Azizunnisa</div>
          <div className="text-gray-400">isra.aziz@yahoo.com</div>
        </div>
        <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2 ">
          <div className="w-1 h-1 bg-blue-700" />
          <div>Await delivery</div>
        </div>
      </div>
    </div>
  );
};

const MyProfile = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] bg-white rounded-lg py-[5rem] px-[2rem]">
        {/* form */}
        <form className="w-full flex flex-col gap-6">
          <div className="flex gap-2 w-full">
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
          <div className="flex gap-2 w-full">
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

        <div className="text-secondary font-semibold text-[1.2rem] py-14 cursor-pointer">
          Forgot Password ?
        </div>
      </div>
    </div>
  );
};
const MyVehicles = () => {
  const content = [
    {
      title: "Honda City",
      model: "Petrol 2022 Model",
    },
    {
      title: "Honda City",
      model: "Petrol 2022 Model",
    },
  ];
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex flex-col gap-6">
        {content.map((data, idx) => {
          return (
            <div
              key={idx}
              className="rounded-lg border border-gray-300 p-[1.5rem] gap-3 flex flex-col"
            >
              <div className="font-semibold text-[1.4rem]">{data.title}</div>
              <div className="text-graycolor2">{data.model}</div>
            </div>
          );
        })}
        <div className="rounded-lg border border-gray-300 p-[1.5rem] gap-3 flex flex-col">
          <div className="font-semibold text-[1.4rem]">No Vehicles Added</div>
          <div className="text-graycolor2">
            Trust our team of experienced mechanics to get your vehicle back in
            top condition. At AutoConnect, we offer a comprehensive range of
            mechanic services to keep your car running smoothly and reliably.
          </div>
        </div>
      </div>
    </div>
  );
};
