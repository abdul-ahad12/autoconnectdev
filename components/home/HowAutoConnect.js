import React from "react";
import TitleDesc from "../section/TitleDesc";
import CusButton from "../section/button";
import AboutusInfo from "../../public/aboutus/aboutusinfo.png";
import Image from "next/image";

const HowAutoConnect = () => {
  const steps = [
    {
      title: "Choose Your Service",
      desc: "Select the type of service you need: mobile services, onsite services, or third-party pick and drop-off services. AUTO LINKX offers a wide range of options to fit your schedule and preferences.",
    },
    {
      title: "Book an Appointment",
      desc: "Once you've selected the service, book an appointment through our intuitive online booking system. Choose a convenient time, and our certified service provider will handle the rest.",
    },
    {
      title: "Service Completion",
      desc: "Whether you opt for mobile services or visit a certified provider's facility, we ensure your vehicle receives top-quality care. For third-party pick and drop-off, we'll handle everything from pickup to return.",
    },
    {
      title: "Enjoy the Results",
      desc: "Your vehicle is serviced, and you're ready to go! AUTO LINKX makes it easy to keep your car in top condition with minimal hassle, leaving you with peace of mind.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-[6rem] bg-[#fbfbfb]">
      <div className="w-[90%]">
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
              <CusButton href={"/aboutus"} type={"primary"} text={"Know More"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowAutoConnect;
