import React, { useEffect, useState } from "react";
import { formatDate } from "../../lib/supportingFncs";
import Swal from "sweetalert2";
import Modal from "../services/ReusableModal";

const Order = ({ bookings, role }) => {
  console.log("orders", bookings);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };
  const fields = [
    { name: "field1", label: "First Name", value: "first" },
    // { name: "field2", label: "Last Name", value: lastname },
    { name: "field2", label: "Phone Number", value: "number" },
    { name: "field2", label: "Email", value: "email" },
    { name: "field2", label: "About Us", value: "aboutus" },
  ];
  return (
    <div className="">
      <div className="base:hidden lg:grid grid-cols-6 gap-x-12 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>ID Order</div>
        <div>Order details</div>
        <div>Service Date</div>
        <div>Order details</div>
        <div>Mode of service</div>
        <div>Action</div>
      </div>
      <div className="flex flex-col gap-9">
        {role !== "MECHANIC" &&
          orders &&
          bookings?.map((order, index) => (
            <div
              key={index}
              className="p-[1.2rem] lg:w-full bg-white rounded-lg flex flex-col border-gray-300 border  z-50"
            >
              <div className="w-full  flex justify-between items-center">
                <div className="text-[1.3rem]">
                  Order #{order?._id.slice(-4)}
                </div>

                <div className="flex base:flex-col lg:flex-row gap-2">
                  <div className="flex items-center rounded-md border border-gray-500 gap-2 px-2 py-1">
                    <div className="w-1 h-1 bg-red-600" />
                    <div>Await payment</div>
                  </div>
                  <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2">
                    <div className="w-1 h-1 bg-blue-700" />
                    <div>
                      {bookings.isCompleted ? "Completed" : "Not Completed"}
                    </div>
                  </div>
                  {/* <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2"> */}
                    {/* <div className="w-1 h-1 bg-blue-700" /> */}
                    {/* {bookings.is  Availability ? "Completed" : "Not Completed"} */}

                    {/* <button onClick={handleOpenModal}>Know More</button> */}
                    {/* <Modal
                      isOpen={isModalOpen}
                      onClose={CloseModal}
                      fields={fields}
                    /> */}
                  {/* </div> */}
                  {bookings.isCompleted && (
                    <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2">
                      <button>View INVOICE</button>
                    </div>
                  )}

                  {/* <div className="flex justify-center items-center rounded-md border-gray-500 border">
            <img src="/icons/dotted.png" />
          </div> */}
                </div>
              </div>
              <div className="my-2 flex base:flex-col lg:flex-row gap-3 lg:items-center">
                Date:<div>{formatDate(order.createdAt)}</div>
                timeSlot:<div>{order.timeSlots.time}</div>
                {/* <div>from</div>
        <div className="font-medium">AC Motors</div> */}
              </div>
              {/* <div className="flex items-center justify-between">
        <div className="flex flex-col my-6">
          <div className="font-medium text-[1rem]">Isra Azizunnisa</div>
          <div className="text-gray-400">isra.aziz@yahoo.com</div>
        </div>
        <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2 ">
          <div className="w-1 h-1 bg-blue-700" />
          <div>Await delivery</div>
        </div>
      </div> */}
            </div>
          ))}
      </div>
      {role === "MECHANIC" &&
        bookings.map((data, idx) => {
          return (
            <div key={idx}>
              <OrderItem
                orderNumber={data._id.slice(0, 4)}
                dateTime={data.createdAt}
                orderStatus={data.isCompleted}
                modeOfService={data.deliveryMode}
                bookingId={data._id}
                firstname={data.customNote}
                aboutus={data.deliveryMode}
                email={data.mechanic}
                number={data.address.street}
              />
            </div>
          );
        })}

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

const OrderItem = ({
  orderNumber,
  dateTime,
  service,
  orderStatus,
  modeOfService,
  bookingId, // Add bookingId prop
  firstname,
  number,
  aboutus,
  email,
}) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Function to handle completion of the booking
  const handleCompleteBooking = async () => {
    // Display a confirmation pop-up
    const result = await Swal.fire({
      title: "Complete Booking",
      text: "Are you sure you want to mark this booking as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it as completed",
      cancelButtonText: "No, cancel",
    });

    // If user confirms, proceed with completion
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `/api/customer/bookings/action/${bookingId}?action=complete`,
          {
            method: "PUT",
          }
        );
        if (response.ok) {
          setIsCompleted(true);
        } else {
          // Handle error
          console.error("Failed to complete booking:", response.statusText);
        }
      } catch (error) {
        console.error("Error completing booking:", error.message);
      }
    }
  };

  // Function to handle cancellation of the booking
  const handleCancelBooking = async () => {
    // Display a confirmation pop-up
    const result = await Swal.fire({
      title: "Cancel Booking",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    // If user confirms, proceed with cancellation
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `/api/customer/bookings/action/${bookingId}?action=cancel`,
          {
            method: "PUT",
          }
        );
        if (response.ok) {
          setIsCancelled(true);
        } else {
          // Handle error
          console.error("Failed to cancel booking:", response.statusText);
        }
      } catch (error) {
        console.error("Error cancelling booking:", error.message);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };
  const fields = [
    { name: "field1", label: "First Name", value: firstname },
    // { name: "field2", label: "Last Name", value: lastname },
    { name: "field2", label: "Phone Number", value: number },
    { name: "field2", label: "Email", value: email },
    { name: "field2", label: "About Us", value: aboutus },
  ];

  return (
    <div className="grid grid-cols-6 gap-x-12 items-center border-[1px] py-3 px-3 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="text-[0.9rem] font-semibold">#{orderNumber}</div>
        <div className="text-[0.6rem]">{formatDate(dateTime)}</div>
      </div>
      <button
        onClick={handleOpenModal}
        className="text-primary w-fit text-[0.7rem] border-[1px] rounded-md p-1"
      >
        Click here
      </button>
      <Modal isOpen={isModalOpen} onClose={CloseModal} fields={fields} />
      <div className="text-graycolor2 text-[0.7rem]">
        {formatDate(dateTime)}
      </div>
      <button
        className={`text-primary w-fit ${
          orderStatus ? "bg-green-500" : "bg-[pink]"
        }  text-[0.7rem] border-[1px] rounded-md p-1`}
      >
        {orderStatus ? "Done" : "Not completed"}
      </button>
      <div className="text-graycolor2 text-[0.8rem]">
        {modeOfService == "TO_MECHANIC" ? "At Mechanic" : "PickUp"}
      </div>
      <div className="flex gap-1">
        {/* Clicking on receipt icon triggers completion of the booking */}
        <img
          className="w-6 cursor-pointer"
          src="../dashboard/receipt.svg"
          alt="receipt"
          onClick={handleCompleteBooking}
        />
        {/* Clicking on cancel icon triggers cancellation of the booking */}
        <img
          className="w-6 cursor-pointer"
          src="../dashboard/cancel.svg"
          alt="cancel"
          onClick={handleCancelBooking}
        />
      </div>
    </div>
  );
};
