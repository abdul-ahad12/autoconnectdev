import React, { useState } from "react";
import TitleDesc from "../section/TitleDesc";
import Description from "../section/Description";
import CusButton from "../section/button";
import { useRouter } from "next/router";

const ServicesWeProvide = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [customBookingText, setCustomBookingText] = useState("");
  const router = useRouter();
  const { location } = router.query;

  console.log(selectedServices);

  const services = [
    {
      title: "Windscreen Replacement",
      noOfServices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "windscreen",
    },
    {
      title: "Brake Inspection",
      noOfServices: "5",
      img: "/services/airconditioningbg.jpg",
      id: "brake-inspection",
    },
    {
      title: "Oil Change",
      noOfServices: "10",
      img: "/services/airconditioningbg.jpg",
      id: "oil-change",
    },
    {
      title: "Wheel Alignment",
      noOfServices: "3",
      img: "/services/airconditioningbg.jpg",
      id: "wheel-alignment",
    },
    {
      title: "Engine Diagnostic",
      noOfServices: "6",
      img: "/services/airconditioningbg.jpg",
      id: "engine-diagnostic",
    },
    {
      title: "Tire Rotation",
      noOfServices: "7",
      img: "/services/airconditioningbg.jpg",
      id: "tire-rotation",
    },
    {
      title: "Battery Replacement",
      noOfServices: "4",
      img: "/services/airconditioningbg.jpg",
      id: "battery-replacement",
    },
    {
      title: "Coolant Flush",
      noOfServices: "5",
      img: "/services/airconditioningbg.jpg",
      id: "coolant-flush",
    },
    {
      title: "Spark Plug Replacement",
      noOfServices: "6",
      img: "/services/airconditioningbg.jpg",
      id: "spark-plug-replacement",
    },
    {
      title: "Transmission Flush",
      noOfServices: "3",
      img: "/services/airconditioningbg.jpg",
      id: "transmission-flush",
    },
  ];

  const handleServiceSelection = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleCustomBookingChange = (e) => {
    setCustomBookingText(e.target.value);
  };

  const handleGetMechanics = () => {
    // Construct URL with selected services' titles and location data
    const selectedServiceTitles = selectedServices.map((serviceId) => {
      const service = services.find((service) => service.id === serviceId);
      return service.title;
    });
    const locationData = {
      location,
    };
    const query = {
      selectedServices: selectedServiceTitles.join(","),
      location: JSON.stringify(locationData),
    };
    const queryString = new URLSearchParams(query).toString();
    const url = `/mechanic?${queryString}`;

    // Navigate to the /mechanic page with the constructed URL
    router.push(url);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
  };

  return (
    <div className="w-full px-[5%] py-[5rem] bg-customwhite">
      <div className="w-[100%]">
        <div className="flex justify-between  w-full">
          <div className="w-[80%]">
            <TitleDesc
              title={"CAR SERVICES"}
              titleColor={"WE PROVIDE"}
              left
              desc={
                "Enjoy convenient car repair and maintenance at your home or office"
              }
            />
          </div>
          <div className="flex gap-4 items-center mt-9">
            {/* <img className="w-8" src="/icons/bike.svg" alt="Bike Icon" /> */}
            {/* <div className="text-yellowcolor font-semibold lg:text-[1vw]">
              Need services for your bike ?
            </div> */}
          </div>
        </div>

        {/* Services listing section */}
        <div className="flex lg:flex-row justify-between py-[3rem]">
          {/* Left section */}
          <div className="w-[60%] grid grid-cols-2 gap-x-[4vw] gap-y-3">
            {services.map((data, idx) => (
              <div
                key={idx}
                className="p-[7px] flex gap-5 justify-between w-full rounded-lg hover:shadow-lg transition ease duration-150 shadow-md"
              >
                <div className="flex gap-3">
                  <img src={data.img} alt={data.title} className="rounded-lg" />
                  <div className="flex flex-col justify-between py-2 w-full">
                    <div className="text-[0.8rem] w-full font-bold">
                      {data.title}
                    </div>
                    {/* <Description text={`${data.noOfServices} services`} /> */}
                  </div>
                </div>
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  onChange={() => handleServiceSelection(data.id)}
                  checked={selectedServices.includes(data.id)}
                />
              </div>
            ))}
            <div className="py-[1rem] w-full col-start-1 col-end-3">
              <div className="text-[1.4rem]">Customize your booking</div>
              <textarea
                rows={10}
                className="w-full p-2 bg-graycolor rounded-lg"
                value={customBookingText}
                onChange={handleCustomBookingChange}
              />
            </div>
          </div>
          {/* Right section */}
          <div className="w-[30%] h-fit bg-customwhite shadow-md rounded-lg">
            {/* Car image */}
            <div className="bg-[#DFDFDF] w-full shadow-lg p-[0.6rem] rounded-[1rem] flex justify-center items-center flex-col">
              <img
                className="w-[48%] py-[1rem]"
                src="/services/dummycar.png"
                alt="Dummy Car"
              />
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-[1rem]">--select--</div>
                  <div className="text-[0.7rem]">Location</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-[1rem]">--select--</div>
                  <div className="text-[0.7rem]">Fuel Type</div>
                </div>
              </div>
            </div>
            {/* Selected services */}
            <div className="p-[2rem] flex flex-col gap-3 items-center rounded-b-lg">
              {selectedServices.map((data, idx) => (
                <div
                  key={idx}
                  className="w-full bg-graycolor flex justify-between text-[0.8rem] rounded-lg p-[1rem] font-bold"
                >
                  <div>{data}</div>
                  <img
                    className="w-4 cursor-pointer"
                    src="/icons/delete.svg"
                    alt="Delete Icon"
                    onClick={() => handleRemoveService(idx)}
                  />
                </div>
              ))}
              <div className="mt-[3rem]">
                <CusButton
                  text={"Get Mechanic"}
                  type={"secondary"}
                  onClick={handleGetMechanics}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesWeProvide;
