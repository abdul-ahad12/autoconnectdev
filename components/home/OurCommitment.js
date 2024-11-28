import React from "react";
import TitleDesc from "../section/TitleDesc";
import Description from "../section/Description";

const OurCommitment = () => {
  return (
    <div className="w-[100%] flex justify-center py-[4rem] bg-customwhite">
      <div className="w-[90%] flex lg:flex-row-reverse base:flex-col">
        {/* left component */}
        <div className="lg:w-[50%] flex justify-center ">
          <img className="w-[80%]" src="/aboutus/aboutusinfo.png" />
        </div>

        {/* right componenet */}
        <div className="lg:w-[50%] base:pt-[3rem] lg:pt-0">
          <TitleDesc title={"OUR"} titleColor={"COMMITMENT"} left />
          <Description
            size={"regular"}
            text="At AUTO LINKX, we are committed to Quality and Excellence: Ensuring every service meets the highest standards of quality and professionalism; user Satisfaction: Prioritizing your needs and satisfaction with every interaction and service booked; and Innovation: Continuously enhancing our platform and services to provide the best user experience and stay ahead of industry trends. Thank you for choosing AUTO LINKX. We are excited to provide you with exceptional car service solutions and look forward to helping you keep your vehicle in top condition with ease and confidence."
          />
        </div>
      </div>
    </div>
  );
};

export default OurCommitment;
