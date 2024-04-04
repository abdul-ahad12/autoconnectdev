import Link from "next/link";
import React from "react";

const CusButton = ({ type, text, href, onClick }) => {
  return (
    <>
      {href ? (
        <Link
          href={href ? href : "/"}
          className={`px-3 py-2  lg:px-7 lg:py-3 w-fit text-[1rem]  hover:cursor-pointer rounded-[2rem] ${
            type === "primary"
              ? "bg-secondary flex justify-center items-center text-graycolor  hover:scale-[1.01] transition ease duration-200"
              : type == "secondary"
              ? "bg-primary text-graycolor flex justify-center items-center hover:scale-[1.01] transition ease duration-200"
              : "bg-transparent text-primary"
          }`}
        >
          {text}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={`px-3 py-2 lg:px-7 lg:py-3 w-fit text-[0.9rem]  hover:cursor-pointer rounded-[2rem] ${
            type === "primary"
              ? "bg-secondary flex justify-center items-center text-graycolor  hover:scale-[1.01] transition ease duration-200"
              : type == "secondary"
              ? "bg-primary text-graycolor flex justify-center items-center hover:scale-[1.01] transition ease duration-200"
              : "bg-transparent text-primary"
          }`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default CusButton;
