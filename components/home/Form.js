import React, { useState } from "react";
import { useRouter } from "next/router";
import Description from "../section/Description";
import CusButton from "../section/button";

// Array of top 25 suburbs of Melbourne
export const melbourneSuburbs = [
  "Carlton",
  "Fitzroy",
  "Richmond",
  "South Yarra",
  "St Kilda",
  "Prahran",
  "Brunswick",
  "Northcote",
  "Footscray",
  "Collingwood",
  "Essendon",
  "Coburg",
  "Kew",
  "Hawthorn",
  "Ascot Vale",
  "Thornbury",
  "Port Melbourne",
  "Williamstown",
  "Moonee Ponds",
  "Box Hill",
  "Camberwell",
  "Malvern",
  "Glen Iris",
  "Elwood",
  "Albert Park",
];

const Form = () => {
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // Validation
    if (
      // city.trim() === "" ||
      suburb.trim() === "" ||
      // postalCode.trim() === "" ||
      isNaN(postalCode)
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Construct query string
    const queryString = `?location=${suburb}`;

    // Navigate to "/service" route with query string
    router.push(`/services${queryString}`);
  };

  return (
    <div className="w-full flex justify-center py-10 lg:pt-[-10vh] lg:pb-[10vh]">
      <div className=" base:w-[90%] rounded-xl lg:rounded-full lg:w-[70%] bg-customwhite flex justify-center py-5 shadow-lg max-w-[1100px]">
        <div className="base:w-[90%] lg:w-[80%] grid lg:grid-cols-4 gap-6">
          {/* location */}
          <div className="flex flex-col gap-1">
            <Description text={"City"} />
            {/* <select
              className="input-class border-black border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              {citiesAustralia.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select> */}
            <input
              className="input-class border border-black"
              value={"Melbourne"}
            />
          </div>
          
          <div className="flex flex-col gap-1">
          <Description text={"Suburb"} />
          {/* Suburb */}
          <select
            className="input-class border-black border"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          >
            <option className="input-class">Select Suburb</option>
            {melbourneSuburbs.map((suburb) => (
              <option className="input-class" key={suburb} value={suburb}>
                {suburb}
              </option>
            ))}
          </select></div>
          {/* Fuel Type  */}
          <div className="flex flex-col gap-1">
            <Description text={"Postal Code"} />
            <input
              className="input-class border-black border"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="flex justify-end w-full">
            {" "}
            <CusButton
              text={"Get Mechanic"}
              type={"secondary"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
