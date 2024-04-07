import React, { useEffect, useState } from "react";
import Order from "./Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/common/Tabs";
import axios from "axios";
import CusButton from "./button";
import Modal from "../services/ReusableModal";
import ServicesModal from "../services/ServicesModal";

const OrdersList = ({ bookings, role }) => {
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
            <TabsTrigger className="w-[100px] " value="password">
              Customs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Order role={role} bookings={bookings} />
          </TabsContent>
          <TabsContent value="password">
            {role === "MECHANIC" && <CustomOrder />}
            {role === "CUSTOMER" && <CustomOrderCustomer />}
          </TabsContent>
        </Tabs>

        {/* <Order />
        <Order /> */}
      </div>
    </div>
  );
};

export default OrdersList;

// mechanic dashboard
export const CustomOrder = () => {
  const [customOrders, setCustomOrders] = useState([]);
  console.log(customOrders);
  const [price, setPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize with today's date
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Function to fetch custom orders
    const fetchCustomOrders = async () => {
      try {
        const response = await axios.get(
          "/api/customorder/mechanicgetallcustomroders"
        );
        const { customOrders } = response.data;
        setCustomOrders(customOrders);
      } catch (error) {
        // Handle error
        console.error("Error fetching custom orders:", error);
      }
    };

    // Call the fetchCustomOrders function
    fetchCustomOrders();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  // Function to handle form submission
  const handleSubmit = async (orderId, e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/customorder/mechanicsubmitprice",
        {
          orderId,
          price,
          availableDate: selectedDate,
        }
      );

      console.log("Response:", response.data);
      // Handle successful submission
    } catch (error) {
      // Handle error
      console.error("Error submitting offer:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col gap-4 ">
        {customOrders.map((order, idx) => (
          <div className="mt-4" key={idx}>
            <form
              className="flex flex-wrap gap-3 lg:justify-between items-center border  px-3 py-4 rounded-lg "
              onSubmit={(e) => handleSubmit(order._id, e)}
            >
              <div className="">
                <span className="text-graycolor2">Car Name :</span>{" "}
                {order.carName}
              </div>
              <div className="">
                <span className="text-graycolor2">Manufacturing Year :</span>{" "}
                {order.manufacturingYear}
              </div>
              <button
                onClick={handleOpenModal}
                className="text-primary w-fit text-[0.8rem] border-2 rounded-md p-1"
              >
                Click here
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={CloseModal}
                fields={[
                  { name: "field1", label: "Car Name", value: order.carName },
                  { name: "field2", label: "City", value: order.city },
                  {
                    name: "field3",
                    label: "Detail Text",
                    value: order.detailedText,
                  },
                  { name: "field4", label: "Pincode", value: order.pincode },
                  { name: "field5", label: "Street", value: order.street },
                  { name: "field6", label: "Suburb", value: order.suburb },
                ]}
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                required
                className="border p-2 rounded-lg"
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-graycolor2 w-fit border  rounded-full px-4 py-1 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

// customerdashboard
export const CustomOrderCustomer = () => {
  const [customOrders, setCustomOrders] = useState([]);
  console.log(customOrders);

  // Function to handle accepting a custom booking
  const acceptBooking = async (orderId, mechanicUserId) => {
    try {
      const response = await axios.post(
        "/api/customorder/customeraccepts",
        { orderId, mechanicUserId },
        {
          withCredentials: true, // Set withCredentials to true
        }
      );
      console.log("Booking accepted:", response.data.message);
      // Optionally, you can update the UI or state based on the response
    } catch (error) {
      console.error("Error accepting custom booking:", error);
    }
  };

  useEffect(() => {
    const fetchCustomOrders = async () => {
      try {
        const response = await axios.get(
          "/api/customorder/getallmechanicoffers",
          {
            withCredentials: true, // Set withCredentials to true
          }
        );
        setCustomOrders(response.data.customOrders);
      } catch (error) {
        console.error("Error fetching custom orders:", error);
      }
    };

    fetchCustomOrders();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <div className="base:hidden lg:grid lg:grid-cols-4 lg:gap-x-28 items-center text-[1rem]  py-3 px-2 rounded-lg">
        <div>Mechanic Id</div>
        <div>Available Date</div>
        <div>Price</div>
        <div>Action</div>
      </div>
      {customOrders.length > 0 &&
        customOrders[0].mechanicOffers?.map((data, idx) => {
          return (
            <div
              className="text-black grid base:gap-y-4 base:grid-cols-1  lg:grid-cols-4 gap-x-20 border p-5 rounded-lg "
              key={idx}
            >
              <div className="flex gap-2">
                <span className="base:flex lg:hidden">Mechanic ID :</span>
                {data.mechanic &&
                  data.mechanic.substring(data.mechanic.length - 4)}
              </div>
              <div className="flex gap-2">
                <span className="base:flex lg:hidden">Date : </span>
                {data.availableDate}
              </div>

              <div className="flex gap-2">
                <span className="base:flex lg:hidden">Price : </span>
                {data.price}
              </div>

              <button
                className="bg-graycolor2 w-fit border  rounded-full px-4 py-1 text-white"
                onClick={() =>
                  acceptBooking(customOrders[0]._id, data.mechanic)
                }
              >
                Accept
              </button>
              {/* <CusButton
                onClick={() =>
                  acceptBooking(customOrders[0]._id, data.mechanic)
                }
                type="primary"
                text={"Accept"}
              /> */}
            </div>
          );
        })}
    </div>
  );
};
