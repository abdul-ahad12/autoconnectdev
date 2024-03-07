import React, { useState } from "react";
import CusButton from "./button";
import OrdersList from "./OrderList";
import MyProfile from "./MyProfile";
import MyVehicles from "./MyVehicles";
import Tab from "./Tab";
import MyAvailibility from "./MyAvailability";
import RequestAdmin from "../admin/RequestAdmin";
import Requests from "../admin/Requests";
import RequestTabs from "../admin/RequestTabs";
import MechanicInfo from "../admin/MechanicInfo";
import MechanicsOrders from "../admin/mechanic/MechanicsOrders";
import MechanicsDashbord from "../admin/mechanic/MechanicsDashbord";
import MechanicAdminContainer from "../admin/mechanic/MechanicAdminContaine";

const AdminDashboard = ({ bookings }) => {
  const [current, setcurrent] = useState("Orders");

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
  ];
  return (
    <div className="w-full flex justify-center bg-white overflow-hidden">
      <div className="w-[90%] flex pt-[3rem] gap-[2rem]">
        {/* left bar */}
        <div className="w-[25%] flex items-center flex-col h-[80vh]  justify-between rounded-lg border border-graycolor2 p-7  ">
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
        <div className="w-[90%] pb-[40vh] relative">
          {current == "Requests" && <RequestTabs bookings={bookings} />}
          {current == "Home" && <MechanicInfo />}
          {current == "Mechanics" && <MechanicsOrders bookings={bookings} />}
          {current == "My Availability" && <MyAvailibility />}

          <img
            className="absolute bottom-0 right-[-10%] w-[80%]"
            src="/mechanic/bgmech.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
