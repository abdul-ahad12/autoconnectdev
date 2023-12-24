import React from "react";
import TitleDesc from "../section/TitleDesc";

const SmartApp = () => {
  return (
    <div className="w-full bg-primary flex-col  items-center flex py-[8rem]">
      <div className="w-[90%] relative">
        <TitleDesc
          title={"SMART APP, QUICK SERVICES!"}
          titleColor={"Stay Tuned"}
          white
          left
          desc={
            "Enjoy convenient car repair and maintenance at your home or office Its never been this easy!"
          }
        />
        <div className="pt-[2rem] base:w-[50%] lg:w-[18vw] flex flex-col gap-3">
          <img className="rounded-lg" src="/smartApp/googleplay.jpg" />
          <img className="rounded-lg" src="/smartApp/appstore.jpg" />
        </div>
        <img src="/smartApp/gear.svg" className="absolute top-[-8rem] right-0 lg:flex hidden" />
        <img src="/smartApp/graphite.png" className="absolute  bottom-[-20rem] right-[5rem] lg:flex hidden" />
      </div>
    </div>
  );
};

export default SmartApp;
