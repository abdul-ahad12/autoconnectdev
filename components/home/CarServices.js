import React, { useEffect, useRef } from "react";
import TitleDesc from "../section/TitleDesc";
import CusButton from "../section/button";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const CarServices = () => {
  gsap.registerPlugin(ScrollTrigger);

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

  const CarServicesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: Power3.easeInOut } });

    tl.fromTo(
      CarServicesRef.current.children,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.2 }
    );

    ScrollTrigger.create({
      trigger: CarServicesRef.current,
      animation: tl,
      start: "top bottom",
      end: "bottom center",
      // scrub: 1,
      // markers: true,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top center",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          duration: 0.5,
          scale: 1,
          opacity: 1,
        }
      );
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col py-8">
      <div
        ref={titleRef}
        className="  w-[90%] flex items-center justify-center"
      >
        <TitleDesc
          title={"Car Services"}
          titleColor={"We Provide"}
          desc={"What all we do for you "}
        />
      </div>
      {/* cards */}
      <div ref={CarServicesRef} className="grid lg:grid-cols-5 gap-8 my-[3rem]">
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
      <div className="mb-4 text-graycolor2 text-center lg:text-[1.3rem]">
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
