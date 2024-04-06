import React, { useEffect, useState } from "react";
import Order from "./Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/common/Tabs";
import axios from "axios";

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

  return (
    <div className="w-full">
      <div className="">
        {customOrders.map((order, idx) => (
          <div className="grid grid-cols-1" key={idx}>
            <form
              className="flex gap-2"
              onSubmit={(e) => handleSubmit(order._id, e)}
            >
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                required
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      {customOrders.length > 0 &&
        customOrders[0].mechanicOffers?.map((data, idx) => {
          return (
            <div className="text-black" key={idx}>
              <button
                onClick={() =>
                  acceptBooking(customOrders[0]._id, data.mechanic)
                }
              >
                Click me
              </button>
            </div>
          );
        })}
    </div>
  );
};
