import React, { useState } from "react";
import CusButton from "./button";
import OrdersList from "./OrderList";
import MyProfile from "./MyProfile";
import MyVehicles from "./MyVehicles";
import Tab from "./Tab";
import MyAvailability from "./MyAvailability";
import MyAvailibility from "./MyAvailability";

const Dashboard = ({ bookings, role }) => {
  const [current, setCurrent] = useState("Orders");

  const [Mleftbar, setMleftbar] = useState(false);

  // Define tabs based on role
  let tabs = [];
  if (role === "CUSTOMER") {
    tabs = [
      {
        title: "My Profile",
        icons: "/icons/profile.svg",
      },
      {
        title: "Orders",
        icons: "/icons/orders.svg",
      },
    ];
  } else if (role === "MECHANIC") {
    tabs = [
      {
        title: "My Profile",
        icons: "/icons/profile.svg",
      },
      {
        title: "Orders",
        icons: "/icons/orders.svg",
      },
      {
        title: "My Availability",
        icons: "/icons/profile.svg",
      },
    ];
  } else if (role === "ADMIN") {
    tabs = [
      {
        title: "Dashboard",
        icons: "/icons/dashboard.svg",
      },
      {
        title: "Reports",
        icons: "/icons/reports.svg",
      },
    ];
  }

  return (
    <div className="w-full flex justify-center bg-white overflow-hidden relative">
      <div className="w-[90%] flex pt-[3rem] gap-[2rem]">
        {/* left bar */}
        <div className="base:hidden w-[25%] lg:flex items-center flex-col h-[90vh]  justify-between rounded-lg border border-graycolor2 p-7  ">
          <div className="text-secondary text-[min(1.7rem,1.7vw)] font-semibold h-[15%]">
            Dashboard
          </div>
          <div className="flex flex-col w-full gap-1 mb-[25vh]">
            {tabs.map((data, idx) => (
              <Tab
                key={idx}
                title={data.title}
                icons={data.icons}
                statefn={setCurrent}
                state={current}
              />
            ))}
          </div>
          <CusButton type={"primary"} text={"Sign Out"} />
        </div>

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
          <div className="w-[70%] h-screen base:flex  absolute z-10 top-14 left-[-2%] lg:hidden items-center flex-col   justify-between rounded-lg border bg-graycolor border-graycolor2 p-7  ">
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
                    statefn={setCurrent}
                    state={current}
                  />
                );
              })}
            </div>
            {/* <CusButton type={"primary"} text={"Sign Out"} /> */}
          </div>
        )}

        {/* right */}
        {/* <div className="lg:w-[90%] lg:pb-[40vh] relative"> */}
        <div className="w-full flex justify-center lg:w-[90%] lg:pb-[40vh] relative">
          <div className="  base:w-[100%] lg:w-full base:my-10 lg:my-0 ">
            {current == "Orders" && <OrdersList bookings={bookings} role={role} />}
            {current == "My Profile" && <MyProfile />}
            {current == "My Vehicles" && <MyVehicles />}
            {current == "My Availability" && <MyAvailibility />}

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

export default Dashboard;
