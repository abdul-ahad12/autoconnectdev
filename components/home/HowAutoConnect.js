import React from "react";
import TitleDesc from "../section/TitleDesc";
import CusButton from "../section/button";

const HowAutoConnect = () => {
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
      <div className="flex lg:flex-row base:flex-col w-full base:pt-10 lg:pt-[7rem]">
        {/* left section */}
        <div className="lg:w-[55%]"></div>
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
          <div className="self-center mt-9"><CusButton type={"primary"} text={"Know More"} /></div>
        </div>
      </div></div>
    </div>
  );
};

export default HowAutoConnect;
