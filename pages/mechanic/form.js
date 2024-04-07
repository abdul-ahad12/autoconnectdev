import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicTop from "@/components/mechanic/MechanicTop";
import Description from "@/components/section/Description";
import TitleDesc from "@/components/section/TitleDesc";
import CusButton from "@/components/section/button";
import React from "react";
import { useAuth } from "../../components/context/AuthProvider";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import { citiesAustralia } from "../../components/home/Form";

const Form = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setuserId] = useState();
  const [userRole, setUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [services, setservices] = useState();
  const [servicesArray, setServicesArray] = useState();

  console.log(userRole);

  useEffect(() => {
    const fetchData = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setuserId(id);
      setUserRole(role);
      setIsLoggedIn(true);

      // setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, []);
  // console.log(userData);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/services");
        console.log(response);
        setServicesArray(response.data.services);
        console.log(response);
        const serviceData = response.data.services.map(
          (service) => service.name
        );
        setservices(serviceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const services = [
  //   "Oil Change",
  //   "Brake Inspection",
  //   "Tire Rotation",
  //   "Engine Tune-Up",
  //   "Wheel Alignment",
  //   "Battery Replacement",
  //   "Coolant Flush",
  //   "Transmission Service",
  //   "Air Filter Replacement",
  //   "Spark Plug Replacement",
  //   "Exhaust System Repair",
  // ];

  const getNextDayOfWeek = (dayOfWeek) => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + ((dayOfWeek + 7 - today.getDay()) % 7));
    return nextDay;
  };

  const [formData, setFormData] = useState({
    name: "",
    aboutus: "",
    address: {
      street: "",
      suburb: "",
      state: "",
      pinCode: "",
    },
    googleMapsLocation: "",
    abn: "",
    availability: {
      monday: {
        date: getNextDayOfWeek(1).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      tuesday: {
        date: getNextDayOfWeek(2).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      wednesday: {
        date: getNextDayOfWeek(3).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      thursday: {
        date: getNextDayOfWeek(4).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      friday: {
        date: getNextDayOfWeek(5).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      saturday: {
        date: getNextDayOfWeek(6).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
      sunday: {
        date: getNextDayOfWeek(0).toISOString().slice(0, 10),
        available: false,
        timings: [],
        startTime: "",
        endTime: "",
      },
    },
    services: [],
    deliveryMode: [],
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith("deliveryMode")) {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          deliveryMode: [...prevData.deliveryMode, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          deliveryMode: prevData.deliveryMode.filter((mode) => mode !== value),
        }));
      }
    } else if (name.startsWith("availability")) {
      const [_, day, field] = name.split(".");
      if (field === "available") {
        setFormData((prevData) => ({
          ...prevData,
          availability: {
            ...prevData.availability,
            [day]: {
              ...prevData.availability[day],
              [field]: checked,
              timings: checked
                ? generateTimings(
                    day,
                    prevData.availability[day].startTime,
                    prevData.availability[day].endTime
                  )
                : [],
            },
          },
        }));
      } else if (field === "startTime" || field === "endTime") {
        setFormData((prevData) => ({
          ...prevData,
          availability: {
            ...prevData.availability,
            [day]: {
              ...prevData.availability[day],
              [field]: value,
              timings: generateTimings(
                day,
                field === "startTime"
                  ? value
                  : prevData.availability[day].startTime,
                field === "endTime" ? value : prevData.availability[day].endTime
              ),
            },
          },
        }));
      }
    } else if (name.startsWith("address")) {
      const [_, addressField] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else if (name.startsWith("services")) {
      // Handle services
      const serviceName = value;
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          services: [
            ...prevData.services,
            { name: serviceName, price: "", id: serviceName }, // Use service name as identifier
          ],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          services: prevData.services.filter(
            (service) => service.name !== serviceName
          ),
        }));
      }
    } else if (name.startsWith("price")) {
      // Handle price
      const serviceName = name.split(".")[1];
      const updatedServices = formData.services.map((service) =>
        service.name === serviceName ? { ...service, price: value } : service
      );
      setFormData((prevData) => ({
        ...prevData,
        services: updatedServices,
      }));
    } else {
      // Handle other form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const generateTimings = (day, startTime, endTime) => {
    if (!startTime || !endTime) {
      return [];
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const timings = [];
    let currentTime = startTotalMinutes;
    while (currentTime < endTotalMinutes) {
      const hour = Math.floor(currentTime / 60);
      const minute = currentTime % 60;
      const formattedHour = String(hour).padStart(2, "0");
      const formattedMinute = String(minute).padStart(2, "0");

      let nextTime;
      if (currentTime + 120 <= endTotalMinutes) {
        nextTime = addTwoHours(`${formattedHour}:${formattedMinute}`);
      } else {
        // If the next time exceeds the end time, set it to the end time
        nextTime = endTime;
      }

      timings.push(`${formattedHour}:${formattedMinute}-${nextTime}`);
      currentTime += 120;
    }
    return timings;
  };

  const addTwoHours = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const totalMinutes = hour * 60 + minute + 120;
    const newHour = Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;
    return `${String(newHour).padStart(2, "0")}:${String(newMinute).padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/mechanic/registration",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log("Registration successful:", data);

        // localStorage.setItem("role", "MECHANIC");
        // localStorage.setItem("mechanicId", data.id);

        // Show success message using Swal
        Swal.fire({
          icon: "success",
          title:
            "Your details have been submitted successfully and are under review",
          text: "You will be mailed if we approve your registration",
          showConfirmButton: true,
          timer: 5000,
        });
        router.push("/");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      let errorMessage = "An error occurred during registration.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="lg:w-[90%] max-w-[1440px] flex flex-col items-center">
        <MechanicTop
          title={"Hi , complete your"}
          titleColor={"profile setup"}
        />
        <div className="mt-[3rem] w-full bg-customwhite flex flex-col items-center pt-[4rem]">
          <TitleDesc title={"Register"} titleColor={"Yourself"} left />

          <form
            className="flex flex-col gap-7 py-[2rem] base:w-[85%] lg:w-[70%]"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col w-full gap-1 ">
              <Description
                className="text-primary"
                size={"inputlabel"}
                text={"Name"}
              />
              <input
                className="input-class border w-full border-graycolor2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* About Us */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"About Us"} />
              <textarea
                className="input-class lg:h-28 border w-full border-graycolor2"
                name="aboutus"
                value={formData.aboutus}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="flex lg:flex-row base:flex-col w-full gap-3">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Street"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Suburb"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="address.suburb"
                  value={formData.address.suburb}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex lg:flex-row base:flex-col  gap-3">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"City"} />
                <select
                  className="input-class border w-full border-graycolor2"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {citiesAustralia.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Pincode"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="address.pinCode"
                  value={formData.address.pinCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Google Maps Location */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Google Maps Location"} />
              <input
                className="input-class border w-full border-graycolor2"
                type="text"
                name="googleMapsLocation"
                value={formData.googleMapsLocation}
                onChange={handleChange}
                placeholder="Enter Google Maps Location"
              />
            </div>

            {/* ABN */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"ABN"} />
              <input
                className="input-class border w-full border-graycolor2"
                type="text"
                name="abn"
                value={formData.abn}
                onChange={handleChange}
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-5 w-full ">
              <Description
                size={"inputlabel"}
                text={"Availability"}
                className="text-or"
              />
              <p className="text-graycolor2 text-[1rem]">
                Select the days you’re available to take the orders and fill in
                the timings
              </p>
              {Object.entries(formData.availability).map(
                ([day, { available }]) => (
                  <div
                    className="flex base:flex-col lg:flex-row  border-2 p-3 rounded-lg lg:items-center base:gap-6 lg:justify-between "
                    key={day}
                  >
                    <div className="flex relative gap-4">
                      <input
                        type="checkbox"
                        name={`availability.${day}.available`}
                        checked={available}
                        onChange={handleChange}
                        // style={{ backgroundColor: available ? "orange" : "" }}
                        id="red"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md  border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity border-secondary border-2  "
                      />
                      <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-[4px] left-[3px] peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="orange"
                          stroke="orange"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <label className="text-primary capitalize">{day}</label>
                    </div>
                    {/* <div className=""> */}
                    {available && (
                      <>
                        {/* Select field for start time */}
                        <select
                          className="lg:w-[50%] border-2 border-secondary outline-none p-1 rounded-lg text-graycolor2"
                          name={`availability.${day}.startTime`}
                          value={formData.availability[day].startTime}
                          onChange={handleChange}
                        >
                          <option className="pointer-events-none select-none selec">
                            Select Start time
                          </option>
                          {Array.from({ length: 7 }, (_, i) => i * 2 + 8).map(
                            (hour) => (
                              <option
                                className="text-primary border-secondary"
                                key={hour}
                                value={`${hour}:00`}
                              >
                                {`${hour}:00`}
                              </option>
                            )
                          )}
                        </select>
                        {/* Select field for end time */}
                        <select
                          className="lg:w-[50%] border-2 border-secondary outline-none p-1 rounded-lg text-graycolor2"
                          name={`availability.${day}.endTime`}
                          value={formData.availability[day].endTime}
                          onChange={handleChange}
                        >
                          <option>Select End Time</option>
                          {Array.from({ length: 7 }, (_, i) => i * 2 + 10).map(
                            (hour) => (
                              <option
                                className="text-primary"
                                key={hour}
                                value={`${hour}:00`}
                              >
                                {`${hour}:00`}
                              </option>
                            )
                          )}
                        </select>
                      </>
                    )}
                  </div>
                  // </div>
                )
              )}
            </div>

            {/* Services */}
            {/* <div className="flex flex-col gap-5 w-full">
              <Description size={"inputlabel"} text={"Services"} />
              {services.map((service, index) => (
                <div
                  className="flex border-2 p-3 rounded-lg items-center gap-8"
                  key={index}
                >
                  <input
                    type="checkbox"
                    name={`services.${index}`}
                    checked={formData.services.some((s) => s.name === service)}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "services",
                          value: service,
                          checked: e.target.checked,
                        },
                      })
                    }
                  />
                  <label className="text-primary">{service}</label>
                  {formData.services.some((s) => s.name === service) && (
                    <input
                      className="border-2 p-1 rounded-lg text-graycolor2"
                      type="number"
                      name={`services.${index}.price`}
                      value={
                        formData.services.find((s) => s.name === service)
                          ?.price || ""
                      }
                      placeholder="Price"
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: `price.${index}`,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div> */}
            <Description size={"inputlabel"} text={"Services"} />
            <div className="grid lg:grid-cols-2 p- gap-5 w-full">
              {services &&
                services.map((service, index) => (
                  <div
                    className="flex lg:flex-row base:flex-col  p-3 rounded-lg lg:items-center base:gap-3 lg:justify-between"
                    key={index}
                  >
                    <label className="flex lg:flex-row relative   h-fit items-center base:gap-4 lg:gap-3 cursor-context-menu">
                      <input
                        type="checkbox"
                        name={`services.${service}`} // Use unique identifier (service name)
                        checked={formData.services.some(
                          (s) => s.name === service
                        )}
                        onChange={(e) =>
                          handleChange({
                            target: {
                              name: "services", // Update the name attribute to "services"
                              value: service,
                              checked: e.target.checked,
                            },
                          })
                        }
                      />

                      {/* Label and price input */}
                      <span className="text-primary">{service}</span>
                      {formData.services.some((s) => s.name === service) && (
                        <input
                          className="border-2 border-secondary p-1 rounded-lg text-graycolor2"
                          type="number"
                          name={`price.${service}`} // Use unique identifier (service name)
                          value={
                            formData.services.find((s) => s.name === service)
                              ?.price || ""
                          }
                          placeholder="Price"
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: `price.${service}`, // Use unique identifier (service name)
                                value: e.target.value,
                              },
                            })
                          }
                        />
                      )}
                    </label>
                  </div>
                ))}
            </div>

            {/* Delivery Mode */}
            <div className="flex items-start flex-col w-full gap-5">
              <Description size={"inputlabel"} text={"Delivery Mode"} />
              {[
                "TO_MECHANIC",
                "TO_CUSTOMER" /* Add more delivery modes here */,
              ].map((mode, index) => (
                <div
                  className="flex relative items-center gap-10 p-4"
                  key={index}
                >
                  <input
                    type="checkbox"
                    name={`deliveryMode`}
                    value={mode}
                    checked={formData.deliveryMode.includes(mode)}
                    onChange={handleChange}
                    // className="h-4"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md  border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity border-secondary border-2  "
                  />
                  <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-[21px] left-[19px] peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="orange"
                      stroke="orange"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <label className="text-primary">{mode}</label>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-secondary w-fit px-6 py-2 rounded-full flex justify-center items-center text-graycolor  hover:scale-[1.01] transition ease duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Form;
