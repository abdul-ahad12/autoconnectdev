import React, { useEffect, useState } from "react";
import TitleDesc from "../section/TitleDesc";
import Description from "../section/Description";
import CusButton from "../section/button";
import { useRouter } from "next/router";
import Modal from "./ReusableModal";
import ServicesModal from "./ServicesModal";
import axios from "axios";
import Swal from "sweetalert2";

const ServicesWeProvide = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [customBookingText, setCustomBookingText] = useState("");
  const router = useRouter();
  const { location } = router.query;
  const [services, setservices] = useState();

  const [servicesArray, setServicesArray] = useState([]);
  

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/services");
        
        const serviceData = response.data.services.map((service) => ({
          title: service.name,
          img: "/services/airconditioningbg.jpg",
          id: service.name.toLowerCase().replace(/\s+/g, "-"),
        }));
        setservices(serviceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

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
    if (selectedServices.length == 0) {
      alert("Select a service");
    } else {
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
    }
    // Construct URL with selected services' titles and location data
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    
    try {
      const response = await axios.post(
        "/api/customorder/customerbooking",
        formData
      );

      if (response.status === 201) {
        console.error("form submitting");

        // Success response
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Custom Order submitted successfully!,Keep checking your dashboard to get offers",
        });
        // Handle success, e.g., close the modal
        setIsModalOpen(false);
        router.push("/customerDashboard");
      } else {
        // Error response
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting the form:", error.message);
      // Show error message to the user using Swal
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="w-full px-[5%] py-[5rem] bg-customwhite ">
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
        <div className="flex base:flex-col lg:flex-row justify-between py-[3rem]">
          {/* Left section */}
          <div className="lg:w-[60%] h-full base:w-[100%] base:flex base:flex-col lg:grid base:grid-cols-1  lg:grid-cols-2 gap-x-[4vw] gap-y-3">
            {services &&
              services.map((data, idx) => (
                <div
                  key={idx}
                  className="p-[7px] flex gap-5 justify-between w-full rounded-lg hover:shadow-lg transition ease duration-150 shadow-md"
                >
                  <div className="flex gap-3">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="rounded-lg"
                    />
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
            {services?.length == 0 && (
              <div className="py-12 text-[1.5rem] w-full text-center">
                No Services to show
              </div>
            )}
            <div className="py-[1rem] w-full col-start-1 col-end-3">
              <div className="base:text-[0.9rem] lg:text-[1.4rem]">
                Customize your booking
              </div>
              {/* <textarea
                rows={10}
                className="w-full p-2 bg-graycolor rounded-lg"
                value={customBookingText}
                onChange={handleCustomBookingChange}
              /> */}
              {/* <div> */}
              <div className="mt-7">
                <CusButton
                  text={"Submit A Form"}
                  onClick={() => setIsModalOpen(true)}
                  type={"primary"}
                />

                <ServicesModal
                  formheading={"For Booking"}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleSubmit}
                  showSubmitButton={true}
                  fields={[
                    { name: "street", label: "Street" },
                    { name: "city", label: "City" },
                    { name: "suburb", label: "Suburb" },

                    { name: "pincode", label: "Pincode" },

                    { name: "carName", label: "Name of the Car" },
                    { name: "manufacturingYear", label: "Manufacturing Year" },
                    { name: "detailedText", label: "Detailed Text" },

                    // Add more fields as needed
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="lg:w-[30%] h-fit bg-customwhite shadow-md rounded-lg">
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
