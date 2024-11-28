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
              "Mr. Jay, a passionate enthusiast of cars and bikes, has always had a natural curiosity for machines and a love for the open road. With an entrepreneurial mindset, he is driven by a desire to innovate and solve real-world problems using technology. Identifying a gap in the automotive service industry, he realized that users often struggle to find reliable and convenient service providers. This challenge sparked his idea for *Auto Linkx*, a platform designed to bridge the gap between users and car service providers."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutusinfo;
