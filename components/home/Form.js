import React, { useState } from "react";
import { useRouter } from "next/router";
import Description from "../section/Description";
import CusButton from "../section/button";

const Form = () => {
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // Validation
    if (
      city.trim() === "" ||
      suburb.trim() === "" ||
      postalCode.trim() === "" ||
      isNaN(postalCode)
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Construct query string
    const queryString = `?postalCode=${postalCode}`;

    // Navigate to "/service" route with query string
    router.push(`/services${queryString}`);
  };

  return (
    <div className="w-full flex justify-center pt-[-10vh] pb-[10vh]">
      <div className="rounded-full w-[70%] bg-customwhite flex justify-center py-5 shadow-lg max-w-[1100px]">
        <div className="w-[80%] grid grid-cols-4 gap-6">
          {/* location */}
          <div className="flex flex-col gap-1">
            <Description text={"City"} />
            <input
              className="input-class border-black border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* Vehicle Type */}
          <div className="flex flex-col gap-1">
            <Description text={"Suburb"} />
            <input
              className="input-class border-black border"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
          </div>
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
