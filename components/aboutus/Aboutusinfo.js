import React from "react";
import TitleDesc from "../section/TitleDesc";
import Description from "../section/Description";

const Aboutusinfo = () => {
  return (
    <div className="w-[100%] flex justify-center py-[4rem] bg-customwhite">
      <div className="w-[90%] flex lg:flex-row base:flex-col">

        {/* left component */}
        <div className="lg:w-[50%] flex justify-center ">
          <img className="w-[80%]" src="/aboutus/aboutusinfo.png" />
        </div>

        {/* right componenet */}
        <div className="lg:w-[50%] base:pt-[3rem] lg:pt-0">
          <TitleDesc title={"ABOUT"} titleColor={"US"} left />
          <Description size={"regular"}  text={"Our experienced technicians provide reliable and consistent service for all your auto repair needs.Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making"} />

        </div>
      </div>
    </div>
  );
};

export default Aboutusinfo;
