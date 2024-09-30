import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/common/Tabs";
import Requests from "./Requests";

const RequestTabs = ({ bookings }) => {
  return (
    <div>
      <div className=" lg:w-[80%] flex-col flex base:justify-center base:items-center lg:items-stretch gap-5">
        <Tabs defaultValue="new" className="base:w-[90%] lg:w-full ">
          <TabsList className="flex gap-3 items justify-start w-full bg-graycolor py-6 px-3 items-center    border-b-2 rounded-none">
            <TabsTrigger
              value="new"
              className="w-[100px] data-[state=active]:bg-graycolor "
            >
              {" "}
              New
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="flex flex-col gap-16 ">
            <Requests bookings={bookings} />
          </TabsContent>
          <TabsContent aria-disabled value="password">
            get
          </TabsContent>
        </Tabs>


      </div>
    </div>
  );
};

export default RequestTabs;
