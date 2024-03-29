import React, { useEffect, useState } from "react";
import Order from "./Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/common/Tabs";
import axios from "axios";

const OrdersList = ({ bookings,role }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[90%] flex-col flex gap-5">
        <Tabs defaultValue="account" className="">
          <TabsList className="flex gap-3 items justify-start  lg:w-full bg-graycolor py-6 px-3 items-center    border-b-2 rounded-none">
            <TabsTrigger
              value="account"
              className="w-[100px] data-[state=active]:bg-graycolor "
            >
              {" "}
              All Orders
            </TabsTrigger>
            <TabsTrigger disabled className="w-[100px] " value="password">
              Customs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Order role={role} bookings={bookings} />
          </TabsContent>
          <TabsContent aria-disabled value="password">
            get
          </TabsContent>
        </Tabs>

        {/* <Order />
        <Order /> */}
      </div>
    </div>
  );
};

export default OrdersList;
