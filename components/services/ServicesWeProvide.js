import React from "react";
import TitleDesc from "../section/TitleDesc";

const ServicesWeProvide = () => {
  return (
    <div className="w-full px-[5%] py-[5rem]">
      <div className="w-[100%]">
        <div className="flex justify-between jus w-full">
          {" "}
          <div className="w-[80%]">
            {" "}
            <TitleDesc
              title={"CAR SERVICES"}
              titleColor={"WE PROVIDE"}
              left
              desc={
                "Enjoy convenient car repair and maintenance at your home or office"
              }
            />
          </div>
          <div className="flex gap-4 items-center mt-9">
            <img className="w-8" src="/icons/bike.svg" />
            <div className="text-yellowcolor font-semibold lg:text-[1vw]">
              Need services for your bike ?
            </div>
          </div>
        </div>

        {/* services listing section */}
      </div>
    </div>
  );
};

export default ServicesWeProvide;
