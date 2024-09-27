import React from "react";

const Values = () => {
  const content = [
    {
      img: "/icons/Accuracy.svg",

      title: "Mission",
      desc: "Our mission is to transform the auto service industry by providing a versatile and efficient platform that meets the diverse needs of car owners. We aim to deliver top-quality service options, exceptional customer experiences, and foster a network of reliable and professional service providers.",
    },
    {
      img: "/icons/lightbulb.svg",

      title: "Values",
      desc: "At AUTO LINKX, we strive to lead the automotive world toward a more sustainable future. We do this by offering customers eco-friendly service options, supporting electric vehicles, and constantly innovating to reduce our carbon footprint.",
    },
    {
      img: "/icons/Scales.svg",

      title: "Vision",
      desc: "We envision a future where car maintenance and additions are as flexible and convenient as your daily routine. By leveraging innovative technology and fostering robust partnerships, we aim to set a new standard in the car service industry, making car care easier, faster, and more reliable",
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
