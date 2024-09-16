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
          <Description
            size={"regular"}
            text={
              "Welcome to AUTO LINKX, your trusted platform for seamless car maintenance and add ons, As a forward-thinking startup, we specialize in connecting customers with a wide array of car service providers, offering unparalleled flexibility and convenience. Whether you prefer mobile services, onsite services, or third-party pick and drop-off services, we ensure your car gets the care it needs, when and where you need it."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutusinfo;
