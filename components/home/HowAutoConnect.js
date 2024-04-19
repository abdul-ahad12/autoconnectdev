import React, { useEffect, useRef } from "react";
import TitleDesc from "../section/TitleDesc";
import CusButton from "../section/button";
import AboutusInfo from "../../public/aboutus/aboutusinfo.png";
import Image from "next/image";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HowAutoConnect = () => {
  gsap.registerPlugin(ScrollTrigger);

  const steps = [
    {
      title: "GET THE QUOTE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "GET THE QUOTE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "GET THE QUOTE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "GET THE QUOTE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const howRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: Power3.easeInOut } });

    tl.fromTo(
      howRef.current.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.3 }
    );

    ScrollTrigger.create({
      trigger: howRef.current,
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

  return (
    <div className="w-full flex flex-col items-center justify-center py-[6rem] bg-[#fbfbfb]">
      <div ref={howRef} className="w-[90%]">
        <TitleDesc
          title={"How AutoConnect"}
          titleColor={"Works"}
          desc={
            "Enjoy convenient car repair and maintenance at your home or office. Its never been this easy!"
          }
        />
        <div className="flex lg:flex-row base:flex-col gap-10 lg:gap-1 w-full base:pt-10 lg:pt-[7rem]">
          {/* left section */}
          <div className="lg:w-[55%] flex justify-center ">
            <Image src={AboutusInfo} alt="pic" className="w-[600px]" />
          </div>
          {/* right section */}
          <div className="lg:w-[45%] flex-col gap-7 flex justify-center  ">
            {steps.map((data, idx) => {
              return (
                <div className="flex gap-4" key={idx}>
                  <div className="w-[2rem] h-[2rem] flex justify-center items-center rounded-full border-2 border-black font-semibold">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col ">
                    <div className="lg:text-[min(1.5vw,1.5rem)] text-primary font-semibold">
                      {data.title}
                    </div>
                    <div className="text-graycolor2">{data.desc}</div>
                  </div>
                </div>
              );
            })}
            <div className="self-center mt-9">
              <CusButton type={"primary"} text={"Know More"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowAutoConnect;
