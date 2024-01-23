import React from 'react'

const Auth = ({children}) => {
    return (
      <div className="w-full flex justify-center bg-primary h-screen">
        <div className="w-[90%] flex gap-8 items-center justify-center">
          <div className="w-[30%] flex-col py-[6rem]">
          
            <div className="lg:text-[min(1.5rem,1.5vw)] text-customwhite">
              Easiest way to get your car repaired
            </div>
  
            <img className="pt-[4rem] w-[70%]" src={"/signup/mechanic.png"} />
          </div>
          <div className="w-[70%] h-[95%] rounded-lg  bg-customwhite  flex justify-center py-7">
            {children}
          </div>
        </div>
      </div>
    );
  };
  

export default Auth