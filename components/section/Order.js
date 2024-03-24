import React, { useEffect, useState } from "react";

const Order = ({ bookings }) => {
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
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/getAllOrders?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
        setTotalCount(data.totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [currentPage]);

  // request admin array

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
      <div className="base:hidden lg:grid grid-cols-6 gap-x-12 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>ID Order</div>
        <div>Order details</div>
        <div>Service Date</div>
        <div>Order details</div>
        <div>Mode of service</div>
        <div>Action</div>
      </div>
      <div className="flex flex-col gap-9">
        {orders &&
          orders?.map((order, index) => (
            <OrderItem
            // key={index}
            // orderNumber={order?._id.slice(0, 4)}
            // dateTime={order?.timeSlots?.date}
            // status={order?.isCompleted}
            // service={order.services[0]}
            />
          ))}
      </div>
      {/* <NoOrdersYet /> */}
      {/* <DateScroll /> */}
      {/* <RangeBar /> */}
      {/* <div className="mt-20">admin component here</div> */}
      {/* <div className="grid  grid-cols-4 gap-x-16 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>Request ID</div>
        <div>Mechanic Name</div>
        <div>Mechanic details</div>
        <div></div>
      </div>
      <div className="flex flex-col gap-9">
        {requestData.map((order, index) => (
          <RequestAdmin
            key={index}
            acmotors={order.acmotor}
            orderNumber={order.orderNumber}
            dateTime={order.dateTime}
            service={order.service}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Order;

const OrderItem = ({ orderNumber, dateTime, status, service }) => (
  <div className="grid base:grid-cols-2 lg:grid-cols-6  gap-x-12 items-center border-[1px] py-3 px-3 rounded-lg">
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
    <div className="flex gap-1">
      {/* <img src="../dashboard/receipt.svg" alt="receipt" /> */}
      <button>Remove</button>

      {/* <img src="../dashboard/cancel.svg" alt="cancel" /> */}
      <button>Remove</button>
    </div>
  </div>
);
