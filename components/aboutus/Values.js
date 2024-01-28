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
      <div className="w-[90%] grid grid-cols-3 gap-10">
        {content.map((data,idx) => (
          <div key={idx} className="shadow-md flex justify-center items-center flex-col py-[2rem] text-center">
            <img className="h-[6rem]" src={data.img} />
            <div className="font-[Bebas] text-[2.2rem] text-primary py-4">
              OUR <span className="text-secondary">{data.title}</span>
            </div>
            <div className="w-[40%] bg-black h-1">
                </div>
                <div className="w-[65%] py-7">
                    {data.desc}
                    </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
