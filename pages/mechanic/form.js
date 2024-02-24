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

  const [formData, setFormData] = useState({
    user: "", 
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
      monday: { date: "", available: false, startTime: "", endTime: "" },
      tuesday: { date: "", available: false, startTime: "", endTime: "" },
      wednesday: { date: "", available: false, startTime: "", endTime: "" },
      thursday: { date: "", available: false, startTime: "", endTime: "" },
      friday: { date: "", available: false, startTime: "", endTime: "" },
      saturday: { date: "", available: false, startTime: "", endTime: "" },
      sunday: { date: "", available: false, startTime: "", endTime: "" },
    },
    services: [],
    deliveryMode: []
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
      setFormData((prevData) => ({
        ...prevData,
        availability: {
          ...prevData.availability,
          [day]: {
            ...prevData.availability[day],
            [field]: value,
          },
        },
      }));
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
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          services: [...prevData.services, { name: value, price: "" }]
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          services: prevData.services.filter(service => service.name !== value)
        }));
      }
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
        body: JSON.stringify(formData),
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
            className="flex flex-col gap-2 py-[2rem] w-[75%]"
            onSubmit={handleSubmit}
          >
            {/* About Us */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"About Us"} />
              <textarea
                className="input-class border w-full border-graycolor2"
                name="aboutus"
                value={formData.aboutus}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="flex w-full gap-2">
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
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"State"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Pin Code"} />
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
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Availability"} />
              {Object.entries(formData.availability).map(
                ([day, { available }]) => (
                  <div key={day}>
                    <input
                      type="checkbox"
                      name={`availability.${day}.available`}
                      checked={available}
                      onChange={handleChange}
                    />
                    <label>{day}</label>
                    {available && (
                      <>
                        {/* Select field for start time */}
                        <select
                          name={`availability.${day}.startTime`}
                          value={formData.availability[day].startTime}
                          onChange={handleChange}
                        >
                          <option>Select Start time</option>
                          {Array.from({ length: 13 }, (_, i) => i + 8).map(
                            (hour) => (
                              <option
                                key={hour}
                                value={`${hour}:00`}
                              >{`${hour}:00`}</option>
                            )
                          )}
                        </select>
                        {/* Select field for end time */}
                        <select
                          name={`availability.${day}.endTime`}
                          value={formData.availability[day].endTime}
                          onChange={handleChange}
                        >
                          <option>Select End Time</option>
                          {Array.from({ length: 13 }, (_, i) => i + 9).map(
                            (hour) => (
                              <option
                                key={hour}
                                value={`${hour}:00`}
                              >{`${hour}:00`}</option>
                            )
                          )}
                        </select>
                      </>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Services */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Services"} />
              {services.map((service, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={`services.${index}`}
                    checked={formData.services.some(s => s.name === service)}
                    onChange={(e) => handleChange({ target: { name: 'services', value: service, checked: e.target.checked } })}
                  />
                  <label>{service}</label>
                </div>
              ))}
            </div>

            {/* Delivery Mode */}
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Delivery Mode"} />
              {[
                "Home PickUp",
                "At Mechanic" /* Add more delivery modes here */,
              ].map((mode, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={`deliveryMode`}
                    value={mode}
                    checked={formData.deliveryMode.includes(mode)}
                    onChange={handleChange}
                  />
                  <label>{mode}</label>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Form;
