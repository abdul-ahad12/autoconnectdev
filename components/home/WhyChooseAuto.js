import React from "react";
import TitleDesc from "../section/TitleDesc";

const WhyChooseAuto = () => {
  const content = [
    {
      img: "/whychooseus/Protect.svg",
      title: "Diverse Service Options",
      desc: "Choose the service type that best fits your schedule and needs, whether it's mobile, onsite, or pick and drop-off services.",
    },
    {
      img: "/whychooseus/Pickup.svg",
      title: "Verified Providers",
      desc: "We partner with thoroughly vetted and certified service providers to ensure high-quality workmanship and professionalism.",
    },
    {
      img: "/whychooseus/Sanitizer.svg",
      title: "Transparency and Trust",
      desc: "Our platform offers clear pricing, detailed service descriptions, and genuine user reviews to help you make informed decisions.",
    },
    {
      img: "/whychooseus/Taxi.svg",
      title: "Convenience",
      desc: "Simplify your life with our intuitive booking system designed for a smooth and efficient experience. Comprehensive Support: Benefit from our dedicated user support team, always ready to assist you with any queries or concerns.",
    }
  ];

  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-[90%] py-[5rem]">
        <TitleDesc title={"WHY CHOOSE"} titleColor={"AutoConnect?"} />
        <div className="py-[4rem] grid base:grid-cols-2 lg:grid-cols-4 base:gap-[2rem] lg:gap-[6rem]">
          {content.map((data, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <img className="lg:w-[4rem] base:w-[3rem]" src={data.img} />
                <div className="base:text-[1.2rem] base:leading-5 lg:leading-7 base:py-2 lg:text-[1.8rem] font-semibold text-primary">
                  {data.title}
                </div>
                <div className="text-graycolor2 text-[0.8rem] lg:text-[1rem] ">
                  {data.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseAuto;
