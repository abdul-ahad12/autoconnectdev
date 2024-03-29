import React from "react";

const Description = ({ text, size, center }) => {
  return (
    <div
      className={`lg:text-[min(1.2vw,1.2rem)] ${
        center ? "text-center" : "text-left"
      } ${
        size === "regular"
          ? "lg:text-[min(1.4rem,1.4vw)]"
          : size === "small"
          ? "lg:text-[min(1.1rem,1.1vw)]"
          : size === "inputlabel"
          ? "lg:text-[0.9rem]"
          : "lg:text-[min(0.7rem,0.7vw)]"
      }  text-graycolor2`}
    >
      {text}
    </div>
  );
};

export default Description;
