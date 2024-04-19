import React, { useEffect, useRef } from "react";
import TitleDesc from "../section/TitleDesc";
import ImageConnector from "../ui/common/ImageConnector";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const MechanicTop = ({ title, titleColor, servicesstate, services }) => {
  gsap.registerPlugin(ScrollTrigger);
  const formImageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: Power3.easeInOut } });

    tl.fromTo(
      formImageRef.current.children,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.2 }
    );

    ScrollTrigger.create({
      trigger: formImageRef.current,
      animation: tl,
      start: "top bottom",
      end: "bottom center",
      // scrub: 1,
      // markers: true,
    });

    return () => {
      tl.kill();
    };
  }, [formImageRef]);

  // const services = ["Services added", "Services added", "Services added"];
  return (
    <div
      ref={formImageRef}
      className="w-full px-[7%] bg-customwhite py-[5rem] rounded-b-[2rem]  flex base:flex-col lg:flex-row relative justify-between"
    >
      <div className="lg:w-[40%] z-30 flex flex-col">
        <TitleDesc left title={title} titleColor={titleColor} bold />
        {/* steps */}
        {/* <ImageConnector /> */}
        <div></div>
      </div>

      {servicesstate && (
        <div className=" flex base:mt-6   lg:mx-[4%] h-full shadow-lg lg:w-[40%] bg-customwhite z-[10000] flex-col rounded-lg p-[2rem]">
          <div className="">Services added</div>
          <div className="mt-[1.5rem]">
            {services?.map((data, idx) => {
              return <div key={idx}>{data}</div>;
            })}
          </div>
        </div>
      )}

      <img
        className="absolute top-0 right-0 z-[1] lg:w-[70%] h-full"
        src="/mechanic/bgmech.svg"
      />
    </div>
  );
};

export default MechanicTop;
