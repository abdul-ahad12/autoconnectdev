import React from "react";

const TitleDesc = ({ title, titleColor, desc, left,white }) => {
  return (
    <div
      className={`flex ${white?"text-graycolor":"text-primary"} flex-col  ${
        left ? "items-start text-left" : "items-center text-center"
      }`}
    >
      <div className="capitalize text-[2rem] lg:text-[min(3vw,3rem)] font-[Bebas]">
        {title}
        <span className="text-secondary ml-2">{titleColor}</span>
      </div>
      {desc && <div className="lg:text-[min(1.2vw,1.2rem)] base:text-[1.2rem] base:mt-[-0.12rem] lg:w-[60%] lg:mt-[-0,7rem]">{desc}</div>}
    </div>
  );
};

export default TitleDesc;
