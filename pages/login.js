import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Auth from "@/components/section/Auth";
import Description from "@/components/section/Description";
import CusButton from "@/components/section/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <>
      <Navbar />
      <Auth>
        <div className=" text-black w-[65%] text-[min(2rem,2vw)] font-semibold flex flex-col justify-center">
          <div> Login</div>
          <form className="flex flex-col gap-5 py-8">
            <div className="flex flex-col w-full gap-1">
              <Description  text={"Email Address"} />
              <input className="input-class border w-full border-graycolor2" />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description  text={"Password"} />
              <input className="input-class border w-full border-graycolor2" />
            </div>
            <div className="flex w-full justify-center">
            <CusButton text={"Login"} type={"secondary"} /></div>
          </form>
        </div>
      </Auth>
      <Footer />
    </>
  );
};

export default Signup;
