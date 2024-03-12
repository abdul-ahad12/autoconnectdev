import React from "react";

const OrderItem = ({
  orderNumber,
  dateTime,
  status,
  service,
  clickbuttons,
  showbutton,
}) => (
  <div className="grid grid-cols-6  gap-x-12 items-center border-[1px] py-3 px-3 rounded-lg">
    <div className="flex flex-col gap-1">
      <div className="text-[0.9rem] font-semibold">{orderNumber}</div>
      <div className="text-[0.6rem]">{dateTime}</div>
    </div>
    <button className="text-primary w-fit text-[0.7rem] border-[1px] rounded-md p-1">
      Click here
    </button>
    <div className="text-graycolor2 text-[0.7rem]">{dateTime}</div>
    <button
      className={`text-primary w-fit ${
        status ? "bg-green-500" : "bg-[pink]"
      }  text-[0.7rem] border-[1px] rounded-md p-1`}
    >
      {status ? "Done" : "Not completed"}
    </button>
    <div className="text-graycolor2 text-[0.8rem]">{service}</div>
    {clickbuttons && (
      <div className="flex gap-1">
        <img src="../dashboard/receipt.svg" alt="receipt" />
        <img src="../dashboard/cancel.svg" alt="cancel" />
      </div>
    )}
    {showbutton && (
      <div className="flex gap-1">
        <button className="text-primary w-fit text-[0.7rem] border-[1px] rounded-md p-1">
          Show
        </button>
      </div>
    )}
  </div>
);

export default OrderItem;
