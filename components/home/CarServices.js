import React from "react";
import TitleDesc from "../section/TitleDesc";
import CusButton from "../section/button";

const CarServices = () => {
  const services = [
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
    {
      img: "/services/carmechanic.svg",
      title: "AC Repair",
      href: "#",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center flex-col py-8">
      <div className="w-[90%] flex justify-center">
        <TitleDesc
          title={"Car Services"}
          titleColor={"We Provide"}
          desc={"What all we do for you "}
        />
      </div>
      {/* cards */}
      <div className="grid lg:grid-cols-5 gap-8 my-[3rem]">
        {services.map((data, idx) => {
          return (
            <div
              key={idx}
              className="w-full lg:h-[17vw] flex justify-center relative flex-col px-[3rem] py-[4rem] lg:p-[3vw] bg-white items-center rounded-[2rem]  shadow-xl hover:shadow-lg transition ease duration-150"
            >
              <img src={data.img} alt={data.title} />
              <div className="absolute base:bottom-3 lg:bottom-6 mt-[1rem] text-[1.1rem] font-medium">
                {data.title}
              </div>
            </div>
          );
        })}
      </div>
      {/* bottom section */}
      <div className="mb-4 text-graycolor2 text-[1.3rem]">
        {" "}
        Our experienced technicians provide reliable and consistent service for
        all your auto repair needs.
      </div>
      {/* Button */}
      <CusButton type="secondary" text={"Know More"} />
    </div>
  );
};

export default CarServices;
