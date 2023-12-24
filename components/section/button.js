import React from "react";

const CusButton = ({ type, text, href }) => {
  return (
    <div
      className={`px-7 py-3 w-fit  hover:cursor-pointer rounded-[2rem] ${
        type === "primary"
          ? "bg-secondary text-graycolor  hover:scale-105 transition ease duration-200"
          : type == "secondary"
          ? "bg-primary text-graycolor"
          : "bg-transparent text-primary"
      }`}
    >
      {text}
    </div>
  );
};

export default CusButton;
