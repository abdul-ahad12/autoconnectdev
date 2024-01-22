import React, { useState } from "react";
import TitleDesc from "../section/TitleDesc";
import Description from "../section/Description";
import CusButton from "../section/button";

const ServicesWeProvide = () => {
  const [selectedservices, setselectedservices] = useState();

  const dummyservices = ["Windscreen replacement", "Brakes"];
  const services = [
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
    {
      title: "Air Conditioning",
      noOfservices: "8",
      img: "/services/airconditioningbg.jpg",
      id: "airconditioning",
    },
  ];

  return (
    <div className="w-full px-[5%] py-[5rem] bg-customwhite">
      <div className="w-[100%]">
        <div className="flex justify-between  w-full">
          {" "}
          <div className="w-[80%]">
            {" "}
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
            <img className="w-8" src="/icons/bike.svg" />
            <div className="text-yellowcolor font-semibold lg:text-[1vw]">
              Need services for your bike ?
            </div>
          </div>
        </div>

        {/* services listing section */}
        <div className="flex lg:flex-row justify-between   py-[3rem]">
          {/* left section */}
          <div className="w-[60%] grid grid-cols-2 gap-x-[4vw] gap-y-3">
            {services.map((data, idx) => {
              return (
                <div key={idx} className="p-[7px] flex gap-5 justify-between w-full rounded-lg hover:shadow-xl transition ease duration-150  shadow-lg">
                  <div className="flex gap-3">
                    {" "}
                    <img src={data.img} className="rounded-lg" />
                    <div className="flex flex-col justify-between py-2 w-full">
                      <div className="text-[0.8rem] w-full font-bold">
                        {data.title}
                      </div>
                      <Description text={`${data.noOfservices} services`} />
                    </div>
                  </div>
                  <input className="cursor-pointer" type="checkbox" />
                </div>
              );
            })}
            <div className="py-[1rem] w-full col-start-1 col-end-3">
              <div className="text-[1.4rem]">Customize your booking</div>
              <textarea rows={10} className="w-full p-2 bg-graycolor rounded-lg"  />
            </div>
          </div>
          {/* right section */}
          <div className="w-[30%] h-fit bg-customwhite shadow-md rounded-lg ">
            {/* car image */}
            <div className="bg-[#DFDFDF] w-full shadow-lg p-[0.6rem] rounded-[1rem] flex justify-center items-center flex-col">
              <img
                className="w-[48%] py-[1rem] "
                src="/services/dummycar.png"
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
            {/* selected services */}
            <div className="p-[2rem] flex flex-col gap-3 items-center rounded-b-lg">
              {dummyservices.map((data, idx) => {
                return (
                  <div key={idx} className="w-full bg-graycolor flex justify-between text-[0.8rem] rounded-lg p-[1rem] font-bold">
                    <div> {data}</div>
                    <img className="w-4" src="/icons/delete.svg" />
                  </div>
                );
              })}
              <div className="mt-[3rem]">
                <CusButton text={"Get Mechanic"} type={"secondary"} href={"/mechanic"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesWeProvide;
