import Link from "next/link";
import React from "react";

const CusButton = ({ type, text, href }) => {
  return (
    <Link
    href={href?href:"/"}
      className={`px-7 py-3 w-fit  hover:cursor-pointer rounded-[2rem] ${
        type === "primary"
          ? "bg-secondary flex justify-center items-center text-graycolor  hover:scale-[1.01] transition ease duration-200"
          : type == "secondary"
          ? "bg-primary text-graycolor flex justify-center items-center hover:scale-[1.01] transition ease duration-200"
          : "bg-transparent text-primary"
      }`}
    >
      {text}
    </Link>
  );
};

export default CusButton;
