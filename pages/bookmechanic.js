import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicTop from "@/components/mechanic/MechanicTop";
import Description from "@/components/section/Description";
import TitleDesc from "@/components/section/TitleDesc";
import CusButton from "@/components/section/button";
import { Calendar } from "@/components/ui/common/Calender";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { fetchUserData } from "../lib/utils";
import { melbourneSuburbs } from "../components/home/Form";

const Bookmechanic = () => {
  const router = useRouter();
  const [mechanicData, setMechanicData] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedMode, setSelectedMode] = useState("TO_MECHANIC");
  const [customNote, setcustomNote] = useState();

  // 
  const handleCheckboxChange = (mode) => {
    setSelectedMode(mode);
  };

  const [selectedDay, setSelectedDay] = useState();
  
  // 
  const [userData, setUserData] = useState();
  
  const [timings, setTimings] = useState();
  const [display, setDisplay] = useState(false);

  // Retrieve the query parameters from the router object
  const { selectedServices } = router.query;
  const selectedServicesData = selectedServices
    ? JSON.parse(decodeURIComponent(selectedServices))
    : [];

  

  // 
  const [date, setDate] = React.useState(new Date());
  const [daysofweek, setdaysofweek] = useState();
  const [address, setAddress] = useState({
    street: "",
    suburb: "",
    state: "Melbourne",
    pinCode: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleNoteChange = (e) => {
    const { value } = e.target;
    setcustomNote(value);
  };

  // Get mechanicId and customerId from query string
  const mechanicId = router.query.mechanicId;
  // const customerId = router.query.customerId;
  const services = router.query.services;

  useEffect(() => {
    if (mechanicId !== undefined) {
      const fn = async () => {
        const response = await fetchUserData();
        
        setUserData(response);
        setDisplay(true);
      };
      fn();
    }
    if (mechanicId !== undefined) {
      const fetchMechanicData = async () => {
        try {
          const response = await axios.get(`/api/mechanic/${mechanicId}`);
          if (response) {
            setMechanicData(response.data.mechanic);
            const daysOfWeek = Object.keys(
              response.data.mechanic?.availability
            );
            setdaysofweek(daysOfWeek); // Set days of week directly here
          }
        } catch (error) {
          console.error("Error fetching mechanic data:", error);
        }
      };
      fetchMechanicData();
      setDisplay(true);
    }
  }, [mechanicId]); // Add mechanicId and customerId to the dependency array

  const typeofdelivery = [
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
  ];
  // Inside the handleSubmit function in the Bookmechanic component
  const handleSubmit = async () => {
    try {
      const obj = {
        mechanicId: mechanicId,
        timeSlots: {
          date: mechanicData.availability[selectedDay].date,
          time: selectedTime,
          available: true,
        },
        deliveryMode: selectedMode,
        services: selectedServicesData, // Pass the selectedServicesData array here
        customNote: customNote,
        address: address,
      };

      const response = await axios.post("/api/bookings/registerABooking", obj);
      

      // Display a SweetAlert pop-up for success
      Swal.fire({
        icon: "success",
        title: "Booking Created Successfully",
        text: "Your booking has been created successfully!",
      });

      router.push("/customerDashboard");

      // Handle success, redirect, or any other action
    } catch (error) {
      console.error("Error creating booking:", error);
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while creating the booking. Please try again later.",
      });
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Navbar />
      <div className="w-[90%]">
        <MechanicTop
          title={"Isra , you’re just a few steps"}
          titleColor={" away!"}
        />
        <div></div>;
        <div className="w-full flex lg:flex-row base:flex-col-reverse gap-6 relative  my-7">
          <div className="lg:w-[65%]    ">
            {/* left side */}
            <div className="flex lg:flex-row base:flex-col justify-between rounded-t-[2rem] base:p-[1rem] lg:p-[2rem] bg-customwhite gap-16">
              <div className="lg:w-[50%]  flex flex-col gap-3">
                <div className="base:text-[1rem] lg:text-[1.5rem] font-semibold">
                  When do you wish to get the{" "}
                  <span className="text-secondary">service </span>done ?
                </div>
                <div className="lg:w-[70%] h-[0.1px] bg-graycolor2"></div>

                <div className="text-secondary base:text-[0.8rem] lg:text-[1.2rem]">
                  <span className="text-black">Prefered</span> Time Slot for{" "}
                  {selectedDay ? selectedDay : "--"}
                </div>

                <select
                  className="input-class lg:w-[50%]"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option>Select TimeSlot</option>
                  {timings?.map((time, index) => (
                    <option
                      key={index}
                      value={time}
                      className="border border-[1px]"
                    >
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="my-2 text-[1rem]">Days availability</div>
                <div className="grid lg:grid-cols-3 gap-2">
                  {daysofweek?.map((day) => {
                    const currentDate = new Date();
                    const dayIndex = [
                      "sunday",
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                    ].indexOf(day.toLowerCase());
                    const date = new Date(
                      currentDate.setDate(
                        currentDate.getDate() +
                          ((dayIndex - currentDate.getDay() + 7) % 7)
                      )
                    );

                    return (
                      <button
                        className={`text-[0.8rem] ${
                          mechanicData?.availability[day].available
                            ? "bg-gray-400"
                            : "bg-white"
                        } bg-white rounded-full px-5 py-1 border border-black`}
                        key={day}
                        style={{
                          color: mechanicData?.availability[day].available
                            ? "black"
                            : "gray",
                          pointerEvents: mechanicData?.availability[day]
                            .available
                            ? "auto"
                            : "none",
                        }}
                        onClick={() => {
                          if (mechanicData?.availability[day].available) {
                            setSelectedDay(day);
                            setTimings(
                              mechanicData?.availability[day]?.timings
                            );
                          }
                        }}
                      >
                        {day.toUpperCase()}
                        <div>{date.toLocaleDateString()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* right side */}
            </div>
            <div className="base:text-[1rem] lg:text-[1.5rem] font-semibold bg-customwhite base:p-[1rem] lg:p-[2rem] rounded-b-[2rem]">
              <div className="py-5">
                {" "}
                Add the <span className="text-secondary">
                  mode of delivery
                </span>{" "}
                to complete your booking
              </div>

              {/* mode of delivery select fields */}
              <div className="flex flex-col gap-3">
                {/* {typeofdelivery.map((data, idx) => (
                  <div
                    key={idx}
                    className="p-[1rem] flex justify-between w-full rounded-lg shadow-md "
                  >
                    <div className="flex gap-4 items-center">
                      <img className="h-full" src={data.img} />
                      <div className="flex flex-col  text-primary">
                        <div className="font-bold text-[1rem]">
                          {data.title}
                        </div>
                        <div className="font-medium text-[0.7rem]">
                          {data.desc}
                        </div>
                      </div>
                    </div>
                    <input type="radio" />
                  </div>
                ))} */}
              </div>

              <div className="flex flex-col font-normal gap-4  lg:text-[1.2rem] ">
                <div className="flex flex-row gap-7 items-center">
                  <label htmlFor="toMechanic">To Mechanic</label>
                  <input
                    type="checkbox"
                    id="toMechanic"
                    value="TO_MECHANIC"
                    checked={selectedMode === "TO_MECHANIC"}
                    onChange={() => handleCheckboxChange("TO_MECHANIC")}
                  />
                </div>
                <div className="flex flex-row gap-11 items-center">
                  <label htmlFor="thirdParty">Third Party</label>

                  <input
                    type="checkbox"
                    id="toCustomer"
                    value="TO_CUSTOMER"
                    checked={selectedMode === "TO_CUSTOMER"}
                    onChange={() => handleCheckboxChange("TO_CUSTOMER")}
                  />
                  {/* <label htmlFor="toCustomer">To Customer</label>

                <input
                  type="checkbox"
                  id="thirdParty"
                  value="THIRD_PARTY"
                  checked={selectedMode === "THIRD_PARTY"}
                  onChange={() => handleCheckboxChange("THIRD_PARTY")}
                /> */}
                </div>
              </div>
              {/* <div className="my-5">
                {" "}
                Services <span className="text-secondary">you</span> Opted for
              </div>
              <div className="flex flex-col gap-2 ml-3">
                {selectedServicesData?.map((data, idx) => {
                  return (
                    <div key={idx} className="flex text-[1rem] font-medium">
                      <strong>{data.name}</strong> : <div>${data.price}</div>
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="my-5 bg-customwhite rounded-[2rem] p-[2rem]">
              <div className="text-[1.5rem] font-semibold">
                {" "}
                Confirm Your <span className="text-secondary">
                  booking.
                </span>{" "}
              </div>
              <form className="flex  w-full flex-col gap-2 py-[2rem]">
                <div className="flex w-full justify-between gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"First Name"} />
                    <input
                      value={userData?.name}
                      className="input-class border w-full border-graycolor2"
                    />
                  </div>
                  {/* <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Last Name"} />
                    <input className="input-class border w-full border-graycolor2" />
                  </div> */}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <Description size={"inputlabel"} text={"Email"} />
                  <input
                    value={userData?.email}
                    className="input-class border w-full border-graycolor2"
                  />
                </div>
                <div className="flex base:flex-col lg:flex-row w-full justify-between gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Phone Number"} />
                    <input
                      value={userData?.phoneNumber}
                      className="input-class border w-full border-graycolor2"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Alternate"} />
                    <input className="input-class border w-full border-graycolor2" />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-x-5 gap-y-5">
                  {/* <div className="flex gap-2"> */}
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Street"} />
                    <input
                      className="input-class border w-full border-graycolor2"
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  {/* <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={address.street}
                    onChange={handleAddressChange}
                  /> */}
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Suburb"} />
                    <select
                      className="input-class border w-full border-graycolor2"
                      name="suburb"
                      value={address.suburb}
                      onChange={handleAddressChange}
                    >
                      <option value="">Select Suburb</option>
                      {melbourneSuburbs.map((suburb) => (
                        <option key={suburb} value={suburb}>
                          {suburb}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* </div> */}
                  {/* <div> */}
                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"City"} />
                    <input
                      className="input-class border w-full border-graycolor2"
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <Description size={"inputlabel"} text={"Pincode"} />
                    <input
                      className="input-class border w-full border-graycolor2"
                      type="text"
                      name="pinCode"
                      value={address.pinCode}
                      onChange={handleAddressChange}
                    />
                  </div>
                  {/* </div> */}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="note" className="inputlabel">
                    Note
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    className="input-class border w-full border-graycolor2"
                    onChange={handleNoteChange}
                  />
                </div>

                <div className="flex w-full flex-col lg:items-center justify-center mt-5">
                  <div className="flex gap-3  items-center mb-9">
                    <input type="checkbox" />
                    <div className="text-[0.8rem]">
                      I have read the TC I agree to our Terms of use and Privacy
                      Policy
                    </div>
                  </div>
                  <div onClick={handleSubmit}>
                    {" "}
                    <CusButton type={"primary"} text={"Confirm"} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* right */}
          <div className="lg:w-[35%] flex flex-col justify-center    h-fit bg-customwhite rounded-[2rem]">
            <img className="rounded-[2rem]" src="/mechanic/dummy.jpg" />

            <div className="px-9 py-3 ml-2 flex flex-col">
              <div className="my-5 font-semibold">
                {" "}
                Services <span className="text-secondary">you</span> Opted for
              </div>
              <div className="flex flex-col  gap-2  ">
                {selectedServicesData?.map((data, idx) => {
                  return (
                    <div key={idx} className="flex text-[1rem] font-medium">
                      <strong>{data.name}</strong> : <div>${data.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex flex-col  px-[5%] py-3">
              <div className="flex justify-between items-center py-4">
                {" "}
                <div className="text-[1.3rem]">AC Motors</div>
                <svg
                  className="w-3"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 14.8464V18.7526H3.90625L15.4271 7.23177L11.5208 3.32552L0 14.8464ZM18.4479 4.21094C18.8542 3.80469 18.8542 3.14844 18.4479 2.74219L16.0104 0.304688C15.6042 -0.101563 14.9479 -0.101563 14.5417 0.304688L12.6354 2.21094L16.5417 6.11719L18.4479 4.21094Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="text-[1rem] px-3 py-5 rounded-lg shadow-md flex justify-between mt-7">
                <div> Services</div>
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.7169 9.62474C18.0944 10.0021 18.0944 10.6141 17.7169 10.9915L13.5372 15.1712C12.688 16.0204 11.3111 16.0204 10.4619 15.1711L6.283 10.9914C5.90562 10.614 5.90567 10.0021 6.28312 9.62472L6.62483 9.28307C7.00227 8.90569 7.61417 8.90575 7.99155 9.28319L11.9996 13.292L16.0085 9.28306C16.3859 8.90565 16.9979 8.90565 17.3753 9.28306L17.7169 9.62474Z"
                    fill="#BBC4CD"
                  />
                </svg>
              </div>
              <div className="text-[1rem] px-3 py-5 rounded-lg shadow-md flex justify-between">
                <div>Extras</div>
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.7169 9.62474C18.0944 10.0021 18.0944 10.6141 17.7169 10.9915L13.5372 15.1712C12.688 16.0204 11.3111 16.0204 10.4619 15.1711L6.283 10.9914C5.90562 10.614 5.90567 10.0021 6.28312 9.62472L6.62483 9.28307C7.00227 8.90569 7.61417 8.90575 7.99155 9.28319L11.9996 13.292L16.0085 9.28306C16.3859 8.90565 16.9979 8.90565 17.3753 9.28306L17.7169 9.62474Z"
                    fill="#BBC4CD"
                  />
                </svg>
              </div>
              <div className="w-full flex justify-center pt-8">
                <CusButton type={"secondary"} text={"Book Mechanic"} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmechanic;
