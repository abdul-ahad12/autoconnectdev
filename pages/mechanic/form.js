import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicTop from "@/components/mechanic/MechanicTop";
import Description from "@/components/section/Description";
import TitleDesc from "@/components/section/TitleDesc";
import CusButton from "@/components/section/button";
import React from "react";
import { useAuth } from "../../components/context/AuthProvider";

const Form = () => {
  const { isLoggedIn, userData } = useAuth();
  console.log(userData);

  const [formData, setFormData] = useState({
    city: "",
    code: "",
    googleMapsLocation: "",
    abn: "",
    days: [],
    startTime: "",
    endTime: "",
    services: [],
    deliveryMode: [],
    vehicleTypes: [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (
      name === "services" ||
      name === "deliveryMode" ||
      name === "vehicleTypes"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (name === "days") {
      setFormData((prevData) => ({
        ...prevData,
        days: checked
          ? [...prevData.days, value]
          : prevData.days.filter((day) => day !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mechanics/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: formData.user, // Assuming formData.user holds the user ID
          address: {
            city: formData.city,
            code: formData.code,
          },
          googleMapsLocation: formData.googleMapsLocation,
          abn: formData.abn,
          availability: {
            days: formData.days,
            startTime: formData.startTime,
            endTime: formData.endTime,
          },
          services: formData.services,
          // deliveryMode: formData.deliveryMode,
          // vehicleTypes: formData.vehicleTypes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // Redirect or perform any necessary actions upon successful registration
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.message);
        // Handle registration failure
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle other errors such as network issues
    }
  };

  const services = [
    "Oil Change",
    "Brake Inspection",
    "Tire Rotation",
    "Engine Tune-Up",
    "Wheel Alignment",
    "Battery Replacement",
    "Coolant Flush",
    "Transmission Service",
    "Air Filter Replacement",
    "Spark Plug Replacement",
    "Exhaust System Repair",
  ];

  // Generating options for cities
  const cities = [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
    "Canberra",
    "Newcastle",
    "Sunshine Coast",
    "Wollongong",
  ];

  // Generating options for start and end times
  const startTimes = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);
  const endTimes = Array.from({ length: 13 }, (_, i) => `${i + 9}:00`);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[90%] max-w-[1440px] flex flex-col items-center">
        <MechanicTop
          title={"Hi Isra, complete your"}
          titleColor={"profile setup"}
        />
        <div className="mt-[3rem] w-full bg-customwhite flex flex-col items-center pt-[4rem]">
          <TitleDesc title={"Register"} titleColor={"Yourself"} left />
          <form
            className="flex  flex-col gap-2 py-[2rem] w-[75%]"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full gap-2">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"City"} />
                <select
                  className="input-class border w-full border-graycolor2"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Postal Code"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Google Maps Location"} />
              <input
                className="input-class border w-full border-graycolor2"
                type="text"
                name="googleMapsLocation"
                value={formData.googleMapsLocation}
                onChange={handleChange}
              />
            </div>
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
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Days"} />
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day}>
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={formData.days.includes(day)}
                    onChange={handleChange}
                  />
                  <label>{day}</label>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between gap-2">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Start Time"} />
                <select
                  className="input-class border w-full border-graycolor2"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                >
                  <option value="">Select start time</option>
                  {startTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"End Time"} />
                <select
                  className="input-class border w-full border-graycolor2"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                >
                  <option value="">Select end time</option>
                  {endTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Services"} />
              {services.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                  />
                  <label>{service}</label>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Delivery Mode"} />
              {[
                "Home PickUp",
                "At Mechanic" /* Add more delivery modes here */,
              ].map((mode) => (
                <div key={mode}>
                  <input
                    type="checkbox"
                    name="deliveryMode"
                    value={mode}
                    checked={formData.deliveryMode.includes(mode)}
                    onChange={handleChange}
                  />
                  <label>{mode}</label>
                </div>
              ))}
            </div>
<button type="submit">
Click me
</button>
            {/* <div className="flex justify-center">
              <CusButton type={"primary"} text={"Confirm"} />
            </div> */}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Form;
