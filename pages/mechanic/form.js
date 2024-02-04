import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicTop from "@/components/mechanic/MechanicTop";
import Description from "@/components/section/Description";
import TitleDesc from "@/components/section/TitleDesc";
import CusButton from "@/components/section/button";
import React from "react";

const Form = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[90%] max-w-[1440px] flex flex-col items-center">
        <MechanicTop
          title={"Hi Isra , complete your"}
          titleColor={" profile setup"}
        />
        <div className="mt-[3rem] w-full bg-customwhite flex  flex-col items-center pt-[4rem]">
          <TitleDesc title={"Register"} titleColor={"Yourself"} left />
          <form className="flex  flex-col gap-2 py-[2rem] w-[75%]">
            <div className="flex w-full justify-between gap-2">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"First Name"} />
                <input className="input-class border w-full border-graycolor2" />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Last Name"} />
                <input className="input-class border w-full border-graycolor2" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Email"} />
              <input className="input-class border w-full border-graycolor2" />
            </div>
            <div className="flex w-full justify-between gap-2">
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Phone Number"} />
                <input className="input-class border w-full border-graycolor2" />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description size={"inputlabel"} text={"Alternate"} />
                <input className="input-class border w-full border-graycolor2" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description size={"inputlabel"} text={"Note"} />
              <textarea className="input-class border w-full border-graycolor2" />
            </div>

            <div className="flex w-full flex-col items-center justify-center mt-5">
              <div className="flex items-center mb-9">
                <input type="checkbox" />
                <div className="text-[0.8rem]">
                  I have read the TC I agree to our Terms of use and Privacy
                  Policy
                </div>
              </div>
              <div onClick={() => console.log("hello")}>
                {" "}
                <CusButton type={"primary"} text={"Confirm"} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Form;
