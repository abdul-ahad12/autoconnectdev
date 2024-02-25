// import React from 'react'

// const Order = () => {
//     return (
//       <div className="p-[1.2rem] w-full bg-white rounded-lg flex flex-col border-gray-300 border  z-50">
//         <div className="w-full  flex justify-between items-center">
//           <div className="text-[1.3rem]">Order #2416</div>
//           <div className="flex gap-2">
//             <div className="flex items-center rounded-md border border-gray-500 gap-2 px-2 py-1">
//               <div className="w-1 h-1 bg-red-600" />
//               <div>Await payment</div>
//             </div>
//             <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2">
//               <div className="w-1 h-1 bg-blue-700" />
//               <div>Await delivery</div>
//             </div>
//             <div className="flex justify-center items-center rounded-md border-gray-500 border">
//               <img src="/icons/dotted.png" />
//             </div>
//           </div>
//         </div>
//         <div className="my-2 flex gap-3 items-center">
//           <div>Aug 17, 2024, 2:56:31 PM</div>
//           <div>from</div>
//           <div className="font-medium">AC Motors</div>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col my-6">
//             <div className="font-medium text-[1rem]">Isra Azizunnisa</div>
//             <div className="text-gray-400">isra.aziz@yahoo.com</div>
//           </div>
//           <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2 ">
//             <div className="w-1 h-1 bg-blue-700" />
//             <div>Await delivery</div>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default Order
import React from "react";
import CusButton from "./button";
import CancelImg from "../../public/dashboard/Cancel.svg";
import ReceiptImg from "../../public/dashboard/Receipt.svg";
import NoOrdersYet from "./NoOrdersYet";
import DateScroll from "./DateScroller";
import RangeBar from "./RangeBar";

const Order = () => {
  const ordersData = [
    {
      orderNumber: "Order #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      status: "Aug 17, 2023",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Order #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      status: "Aug 17, 2023",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Order #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      status: "Aug 17, 2023",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Order #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      status: "Aug 17, 2023",
      service: "Mobile mechanic",
    },
    // Add data for the remaining orders here...
  ];
  return (
    <div>
      {/* heading */}

      {/* <div className="p-[1.2rem] w-full bg-white rounded-lg flex flex-col border-gray-300 border  z-50">
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
      </div> */}
      {/* new */}
      <div className="grid grid-cols-6 gap-x-12 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>ID Order</div>
        <div>Order details</div>
        <div>Service Date</div>
        <div>Order details</div>
        <div>Mode of service</div>
        <div>Action</div>
      </div>
      <div className="flex flex-col gap-9">
        {ordersData.map((order, index) => (
          <OrderItem
            key={index}
            orderNumber={order.orderNumber}
            dateTime={order.dateTime}
            status={order.status}
            service={order.service}
          />
        ))}
      </div>
      {/* <NoOrdersYet /> */}
      <DateScroll />
      <RangeBar />
    </div>
  );
};

export default Order;

const OrderItem = ({ orderNumber, dateTime, status, service }) => (
  <div className="grid grid-cols-6  gap-x-12 items-center border-[1px] py-3 px-3 rounded-lg">
    <div className="flex flex-col gap-1">
      <div className="text-[0.9rem]">{orderNumber}</div>
      <div className="text-[0.6rem]">{dateTime}</div>
    </div>
    <button className="text-primary w-fit text-[0.7rem] border-[1px] rounded-md p-1">
      Click here
    </button>
    <div className="text-graycolor2 text-[0.7rem]">{status}</div>
    <button className="text-primary w-fit bg-green-500 text-[0.7rem] border-[1px] rounded-md p-1">
      Done
    </button>
    <div className="text-graycolor2 text-[0.8rem]">{service}</div>
    <div className="flex gap-1">
      <img src="../dashboard/receipt.svg" alt="receipt" />
      <img src="../dashboard/cancel.svg" alt="cancel" />
    </div>
  </div>
);
