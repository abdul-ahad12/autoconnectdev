import React, { useState } from "react";
import CusButton from "./button";
import OrdersList from "./OrderList";
import Tab from "./Tab";
import MyAvailibility from "./MyAvailability";
import RequestTabs from "../admin/RequestTabs";
import MechanicsACOrders from "../admin/mechanic/MechanicsACOrders";
import MechanicHome from "../admin/MechanicHome";
import MechanicsUser from "../admin/MechanicsUser";

const AdminDashboard = ({ bookings }) => {
  const [current, setcurrent] = useState("Requests");

  const tabs = [
    {
      title: "Home",
      icons: "/icons/profile.svg",
    },
    {
      title: "Requests",
      icons: "/icons/orders.svg",
    },
    {
      title: "Mechanics",
      icons: "/icons/profile.svg",
    },
    {
      title: "Users",
      icons: "/icons/orders.svg",
    },
    {
      title: "Orders",
      icons: "/icons/orders.svg",
    },
  ];
  
  const [Mleftbar, setMleftbar] = useState(false);
  return (
    <div className="w-full flex lg:justify-center bg-white overflow-hidden relative">
      <div className="base:w-full lg:w-[90%] flex pt-[3rem] gap-[2rem]">
        {/* left bar */}
        <div className="lg:w-[25%] base:hidden lg:flex lg:items-center flex-col h-[80vh]  justify-between rounded-lg border border-graycolor2 p-7  ">
          <div className="text-secondary text-[min(1.7rem,1.7vw)] font-semibold h-[15%]">
            Dashboard
          </div>
          <div className="lg:flex flex-col w-full gap-1 mb-[25vh]">
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
        {/* mobile left bar */}
        <button
          className="lg:hidden base:flex absolute top-8 left-2"
          onClick={(e) => setMleftbar(!Mleftbar)}
        >
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6.99997H20.5803"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0 1.21426H20.5803"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0 12.7857H20.5803"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {Mleftbar == true && (
          <div className="w-[60%] h-screen base:flex  absolute z-50 top-14 left-[-2%] lg:hidden items-center flex-col   justify-between rounded-lg border bg-graycolor border-graycolor2 p-7  ">
            {/* <div className="text-secondary text-[min(1.7rem,1.7vw)] font-semibold h-[15%]">
              Dashboard
            </div> */}
            <div className="flex flex-col w-full base:gap-4 lg:gap-1 ">
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
          </div>
        )}

        {/* right */}
        <div className="w-full flex justify-center lg:w-[90%] pb-[40vh] relative">
          <div className="  base:w-[90%] lg:w-full base:my-10 lg:my-0 ">
            {current == "Requests" && <RequestTabs bookings={bookings} />}
            {current == "Home" && <MechanicHome />}
            {current == "Mechanics" && <MechanicsACOrders />}
            {current == "My Availability" && <MyAvailibility />}
            {current == "Orders" && <OrdersList bookings={bookings} />}
            {current == "Users" && <MechanicsUser />}

            <img
              className="absolute bottom-0 right-[-10%] w-[80%]"
              src="/mechanic/bgmech.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const LeftBar = ({ tabs }) => {
  const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

  const toggleLeftBar = () => {
    setIsLeftBarVisible(!isLeftBarVisible);
  };

  return (
    <div
      className={`w-[25%] ${
        isLeftBarVisible ? "" : "hidden"
      } flex flex-col items-center h-[80vh] justify-between rounded-lg border border-graycolor2 p-7`}
    >
      <div className="text-secondary text-[min(1.7rem,1.7vw)] font-semibold h-[15%]">
        Dashboard
      </div>
      <div className="flex flex-col w-full gap-1 mb-[25vh]">
        {tabs.map((data, idx) => (
          <Tab
            key={idx}
            title={data.title}
            icons={data.icons}
            statefn={setcurrent}
            state={current}
          />
        ))}
      </div>
      <CusButton type={"primary"} text={"Sign Out"} />
    </div>
  );
};
