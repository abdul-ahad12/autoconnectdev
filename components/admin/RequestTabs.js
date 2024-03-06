import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/common/Tabs";
import RequestAdmin from "./RequestAdmin";
import Requests from "./Requests";

const RequestTabs = ({ bookings }) => {
  return (
    <div>
      <div className="w-[80%] flex-col flex gap-5">
        <Tabs defaultValue="new" className=" ">
          <TabsList className="flex gap-3 items justify-start w-full bg-graycolor py-6 px-3 items-center    border-b-2 rounded-none">
            <TabsTrigger
              value="new"
              className="w-[100px] data-[state=active]:bg-graycolor "
            >
              {" "}
              New
            </TabsTrigger>
            <TabsTrigger disabled className="w-[100px]" value="password">
              Customs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            {/* <Order bookings={bookings} /> */}
            <Requests bookings={bookings} />
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

export default RequestTabs;
