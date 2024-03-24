import { useRouter } from "next/router";
import React from "react";

const Auth = ({ children }) => {
  const router = useRouter();

  const handlemechanic = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If there is a session, redirect to the mechanic page
      router.push("/mechanic/form");
    } else {
      // If there is no session, redirect to the signup page
      router.push("/signup?mechanic=true");
    }
  };

  return (
    <div className="w-full flex justify-center bg-primary min-h-screen">
      <div className="w-[90%] flex base:flex-col lg:flex-row gap-8 items-center justify-center">
        <div className="base:hidden lg:flex lg:w-[30%] flex-col py-[6rem]">
          <div className="lg:text-[min(1.5rem,1.5vw)] text-customwhite">
            Easiest way to get your car repaired
          </div>

          <img className="pt-[4rem] w-[70%]" src={"/signup/mechanic.png"} />
          <div
            onClick={handlemechanic}
            className="flex text-center mt-6 underline font-medium text-secondary cursor-pointer"
          >
            Are you a Mechanic? Register now !!
          </div>
        </div>
        <div className="base:w-full lg:w-[70%] lg:h-[95%] rounded-lg  bg-customwhite  flex justify-center py-7">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Auth;
