import React, { useEffect, useState } from "react";
import CusButton from "../section/button";
import { Checkbox } from "../ui/common/Checkbox";
import { CheckboxDemo } from "../ui/common/CheckboxDemo";
import RangeBar from "../section/RangeBar";
import { useAuth } from "../context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";

const MechanicListing = ({
  mechanics,
  location,
  setLocation,
  toMechanic,
  setToMechanic,
  toCustomer,
  setToCustomer,
  handleClick,
  selectedServices,
}) => {
  const [modalstate, setmodalstate] = useState(false);
  const [modalContent, setModalContent] = useState();
  const content = [
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
  ];

  return (
    <div className="w-full lg:grid  lg:grid-cols-12 gap-9   py-[2rem]">
      <div className="base:col-start-1 base:col-end-11 lg:col-start-1  lg:col-end-4 h-fit p-6 row-span-full  rounded-[2rem] bg-customwhite left-[5%] top-0   py-20">
        <RangeBar
          location={location}
          setLocation={setLocation}
          toMechanic={toMechanic}
          setToMechanic={setToMechanic}
          toCustomer={toCustomer}
          setToCustomer={setToCustomer}
          handleClick={handleClick}
        />
      </div>
      <div className=" col-start-4 lg:ml-7 lg:col-end-13 row-span-full grid lg:grid-cols-2 gap-3">
        {mechanics.length > 0 ? (
          mechanics.map((data, idx) => (
            <div
              onClick={() => {
                setModalContent(data);
                setmodalstate(true);
              }}
              key={idx}
            >
              <SingleCard selectedServices={selectedServices} data={data} />
            </div>
          ))
        ) : (
          <div className="base:hidden lg:flex justify-center w-full pt-[5rem]">
            No mechanics found
          </div>
        )}
      </div>
      {modalstate && (
        <Modal modalContent={modalContent} setmodalstate={setmodalstate} />
      )}
    </div>
  );
};

export default MechanicListing;

const Modal = ({ setmodalstate, modalContent }) => {
  const daysOfWeek = Object.keys(modalContent.availability);
  const router = useRouter();
  const selectedServices = router.query.selectedServices.split(",");

  // Filter the modalContent.services array to include only the selected services
  const selectedServicesData = modalContent.services.filter((service) =>
    selectedServices.includes(service.name)
  );
  

  // Calculate the total price
  const totalPrice = selectedServicesData.reduce(
    (total, service) => total + service.price,
    0
  );

  // Construct the query parameter with selectedServicesData
  const selectedServicesQueryParam = encodeURIComponent(
    JSON.stringify(selectedServicesData)
  );

  return (
    <div className="base:absolute  lg:fixed top-0 left-0 w-full  lg:h-full flex items-center justify-center z-[10000000000000000] ">
      <div
        className="absolute w-full h-full min-h-screen bg-black opacity-50 blur-25"
        onClick={() => setmodalstate(false)}
      ></div>

      <div className="w-[90%] lg:w-[70%] rounded-lg bg-white p-[2rem] base:my-[5rem] lg:my-0 relative z-[100000000000000000] flex justify-center">
        <img
          onClick={() => setmodalstate(false)}
          className="top-6 absolute right-6 cursor-pointer"
          src="/icons/wrong.svg"
        />

        <div className="lg:w-[80%]">
          <div className="border-b max-h-[60vh] overflow-y-scroll scroller">
            {/* Main card */}
            <div className="rounded-lg bg-graycolor px-[1rem] lg:px-[2rem] py-[1rem] flex flex-row">
              <div className="lg:w-[75%] flex flex-col gap-6">
                <div className="lg:text-[min(1.5rem,1.5vw)] base:text-[1.2rem] uppercase font-semibold">
                  {modalContent.name}
                </div>
                <div className="flex flex-col gap-2  text-[1rem] text-graycolor2">
                  <IconText
                    icon={"/icons/location.svg"}
                    text={modalContent.address.street}
                  />
                  <IconText icon={"/icons/verified.svg"} text={"Verified"} />
                </div>
              </div>
            </div>

            {/* aboutus */}
            <div className="flex lg:flex-row base:flex-col-reverse pt-12 pb-6  gap-9  border-b-black">
              <div className="lg:w-[75%] flex flex-col ">
                <div className="text-secondary font-semibold pb-2 lg:text-unique">
                  About us
                </div>
                <div className="lg:text-unique">{modalContent.aboutus}</div>
              </div>
              <div className="flex lg:w-[25%] justify-center items-center">
                <div className="flex lg:flex-col flex-row gap-2  text-[0.7rem] text-graycolor2">
                  <IconText
                    icon={"/icons/location.svg"}
                    text={modalContent.address.street}
                  />
                  <IconText icon={"/icons/verified.svg"} text={"Verified"} />
                  {/* <IconText icon={"/icons/time.svg"} text={"8am to 5pm"} /> */}
                </div>
              </div>
            </div>

            {/* gps location */}
            <div>
              <SingleText text={"GPS Location"} />
              <Link
                className="text-blue-700 underline"
                target="blank"
                href={modalContent.googleMapsLocation}
              >
                {modalContent.googleMapsLocation}
              </Link>
            </div>

            {/* Pricing */}
            {/* <div className="py-4">
              <SingleText text={"Pricing"} />
              
              {selectedServicesData.map((service) => (
                <div key={service._id}>
                  <span>{service.name}</span>: <span>${service.price}</span>
                </div>
              ))}
              <div>Total: ${totalPrice}</div>
            </div> */}
            <div class="py-4">
              <SingleText text={"Pricing"} />
              <table class="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th class="p-3 border border-gray-300">Service</th>
                    <th class="p-3 border border-gray-300">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedServicesData.map((service) => (
                    <tr key={service._id}>
                      <td class="p-3 border border-gray-300">{service.name}</td>
                      <td class="p-3 border border-gray-300">
                        ${service.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td class="p-3 border border-gray-300 font-semibold">
                      Total:
                    </td>
                    <td class="p-3 border border-gray-300 font-semibold">
                      ${totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Timings */}
            <div className="flex flex-col text-unique my-6">
              <div className="text-unique pb-2 font-bold text-secondary">
                Timings
              </div>
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <strong>{day}</strong>:{" "}
                  {modalContent.availability[day].startTime} -{" "}
                  {modalContent.availability[day].endTime}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-end py-7">
            <CusButton
              text={"Book Now"}
              href={`/bookmechanic?mechanicId=${modalContent?._id}&selectedServices=${selectedServicesQueryParam}`}
              type={"primary"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleCard = ({ data, selectedServices }) => {
  // Calculate total price based on selected services
  const totalPrice = selectedServices.reduce((total, service) => {
    const selectedService = data.services.find(
      (mechanicService) => mechanicService.name === service
    );
    if (selectedService) {
      return total + selectedService.price;
    }
    return total;
  }, 0);

  return (
    <div className="rounded-lg p-4 gap-4 grid base:grid-cols-1 lg:grid-cols-[1fr_1.3fr] bg-customwhite relative cursor-pointer">
      <img
        src="/services/dummy.png"
        className="rounded-lg w-full h-full object-cover "
      />
      <div className="gap-3 flex flex-col ">
        <div className="text-[1.4rem]">{data.name}</div>
        <div className="flex flex-col gap-2  text-[0.7rem] text-graycolor2">
          <IconText icon={"/icons/location.svg"} text={data?.address?.street} />
          <IconText icon={"/icons/verified.svg"} text={"Verified"} />
          <IconText icon={"/icons/time.svg"} text={"8am to 5pm"} />
        </div>
        <div className="flex gap-1">
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
        </div>

        <div className="underline text-graycolor2 z-50">More info</div>
      </div>
      <div className="flex flex-col  absolute right-4 bottom-4 ">
        <div className="text-secondary font-semibold text-[1.2rem]">
          ${totalPrice.toFixed(2)} {/* Display total price */}
        </div>
        <div className="rounded-full font-semibold bg-primary text-customwhite text-[0.6rem] px-2 py-2">
          Book Now
        </div>
      </div>
    </div>
  );
};

const IconText = ({ icon, text }) => {
  return (
    <div className="flex gap-3 items-center">
      <img src={icon} className="w-4" />
      <div>{text}</div>
    </div>
  );
};

const SingleText = ({ text }) => {
  return (
    <div className="text-secondary font-semibold pb-2 lg:text-unique">
      {text}
    </div>
  );
};
