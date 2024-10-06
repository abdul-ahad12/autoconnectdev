import React from "react";
import TitleDesc from "../section/TitleDesc";

const ContactUs = () => {
  const content = [
    {
      img: "/icons/email.png",
      title: "Email",
      desc: "enquiries@autolinkx.com",
    },
    {
      img: "/icons/phone.png",
      title: "Phone",
      desc: "+61415599996.",
    }
  ];
  return (
    <div
      id="contactus"
      className="w-full flex justify-center bg-primary py-[7rem]"
    >
      <div className="w-[90%]">
        <TitleDesc
          title={"Contact"}
          titleColor={"Us"}
          white
          left
          desc={"Our friendly team would love to hear from you!"}
        />
        <div className="flex base:flex-col lg:flex-row items-center">
          <div className="flex flex-col gap-10 py-[4rem] pl-[3rem]">
            {content.map((data, idx) => {
              return (
                <div key={idx}>
                  <IconText
                    title={data.title}
                    icon={data.img}
                    desc={data.desc}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <img src="/aboutus/location.png" className="w-[90%]"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

const IconText = ({ icon, title, desc }) => {
  return (
    <div className="flex base:flex-c  lg:flex-row gap-4 items-center ">
      <img src={icon} className="base:w-[2.5rem] lg:w-[4rem]" />
      <div className="flex flex-col">
        <div className="text-customwhite text-[1.3rem]">{title}</div>
        <div className="text-graycolor2 w-[100%]">{desc} </div>
      </div>
    </div>
  );
};
