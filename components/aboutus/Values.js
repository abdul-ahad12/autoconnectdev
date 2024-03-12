import React from "react";

const Values = () => {
  const content = [
    {
      img: "/icons/Accuracy.svg",

      title: "Mission",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.e world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making",
    },
    {
      img: "/icons/lightbulb.svg",

      title: "Values",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.e world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making",
    },
    {
      img: "/icons/Scales.svg",

      title: "Vision",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.e world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making",
    },
  ];

  return (
    <div className="w-full flex justify-center bg-customwhite rounded-lg py-[5rem]">
      <div className="w-[90%] grid lg:grid-cols-3 gap-10">
        {content.map((data, idx) => (
          <div
            key={idx}
            className="shadow-md flex justify-center items-center flex-col lg:py-[2rem] text-center"
          >
            <img className="base:h-[4rem] lg:h-[6rem]" src={data.img} />
            <div className="font-[Bebas] base:text-[1.5rem] lg:text-[2.2rem] text-primary py-4">
              OUR <span className="text-secondary">{data.title}</span>
            </div>
            <div className="base:w-[70%] lg:w-[40%] bg-black h-1"></div>
            <div className="base:w-[90%] lg:w-[65%] base:py-4 lg:py-7">
              {data.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
