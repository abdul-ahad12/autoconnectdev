import React, { useState } from "react";
import CusButton from "../section/button";
import { Checkbox } from "../ui/common/Checkbox";
import { CheckboxDemo } from "../ui/common/CheckboxDemo";
import RangeBar from "../section/RangeBar";

const MechanicListing = () => {
  const [modalstate, setmodalstate] = useState(false);
  const content = [
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
    { title: "AC Motors", price: "$345" },
  ];

  return (
    <div className="w-full grid grid-cols-12 gap-9   py-[2rem]">
      <div className="col-start-1  col-end-4 h-fit p-6 row-span-full  rounded-[2rem] bg-customwhite left-[5%] top-0   py-20">
        <RangeBar />
      </div>
      <div className=" col-start-4 ml-7 col-end-13 row-span-full grid grid-cols-2 gap-3">
        {content.map((data, idx) => (
          <div
            onClick={() => {
              setmodalstate(true);
            }}
            key={idx}
          >
            <SingleCard title={data.title} price={data.price} />
          </div>
        ))}
      </div>
      {modalstate && <Modal setmodalstate={setmodalstate} />}
    </div>
  );
};

export default MechanicListing;

const Modal = ({ setmodalstate }) => {
  return (
    <div className="base:absolute  lg:fixed top-0 left-0 w-full  lg:h-full flex items-center justify-center z-[10000000000000000] ">
      <div
        className="absolute w-full h-full min-h-screen bg-black opacity-50 blur-25"
        onClick={() => setmodalstate(false)}
      ></div>

      <div className="w-[90%] lg:w-[70%] rounded-lg bg-white p-[2rem] base:my-[5rem] lg:my-0 relative z-[100000000000000000] flex justify-center">
        <img
          onClick={() => setmodalstate(false)}
          className="top-6 absolute right-6 cursor-pointer"
          src="/icons/wrong.svg"
        />

        <div className="lg:w-[80%]">
          <div className="border-b max-h-[60vh] overflow-y-scroll scroller">
            {/* Main card */}
            <div className="rounded-lg bg-graycolor px-[1rem] lg:px-[2rem] py-[1rem] flex flex-row">
              <div className="lg:w-[75%] flex flex-col gap-6">
                <div className="lg:text-[min(1.5rem,1.5vw)] text-[1.8rem] uppercase font-semibold">
                  AC MOTORS
                </div>
                <div className="flex flex-col gap-2  text-[1rem] text-graycolor2">
                  {/* <IconText icon={"/icons/location.svg"} text={"Mehdipatnam"} />
                  <IconText icon={"/icons/verified.svg"} text={"Verified"} />
                  <IconText icon={"/icons/time.svg"} text={"8am to 5pm"} /> */}
                  <CheckboxDemo id="terms" label="AC Specialist" />
                  <CheckboxDemo id="terms" label="1 Day Delivery" />
                  <CheckboxDemo id="terms" label="7 years experience" />
                </div>
                {/* stars */}
                {/* <div className="flex lg:flex-row flex-col gap-2 text-[0.8rem]">
                  <div className="flex gap-1">
                    <img className="w-8" src="/icons/star.svg" />
                    <img className="w-8" src="/icons/star.svg" />
                    <img className="w-8" src="/icons/star.svg" />
                    <img className="w-8" src="/icons/star.svg" />
                  </div>
                  | Total services done on AutoConnect : 5
                </div> */}
                <div></div>
              </div>
            </div>

            {/* aboutus */}
            <div className="flex lg:flex-row base:flex-col-reverse py-12 gap-9  border-b-black">
              <div className="lg:w-[75%] flex flex-col ">
                <div className="text-secondary font-semibold pb-2 lg:text-unique">
                  About us
                </div>
                <div className="lg:text-unique">
                  Lorem Ipsum is simply dummy text of the . Lorem Ipsum has been
                  the.Lorem Ipsum has.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of
                </div>
              </div>
              <div className="flex lg:w-[25%] justify-center items-center">
                <div className="flex lg:flex-col flex-row gap-2  text-[0.7rem] text-graycolor2">
                  <IconText icon={"/icons/location.svg"} text={"Mehdipatnam"} />
                  <IconText icon={"/icons/verified.svg"} text={"Verified"} />
                  <IconText icon={"/icons/time.svg"} text={"8am to 5pm"} />
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="flex flex-col text-unique">
              <div className="text-unique pb-2 font-bold text-secondary">
                Timings
              </div>
              <div>Monday : 8am to 7pm</div>
              <div>Tuesday : 8am to 7pm</div>
              <div>Wednesday : 8am to 7pm</div>
              <div>Thursday : 8am to 7pm</div>
              <div>Friday : 8am to 7pm</div>
              <div>Saturday : 8am to 7pm</div>
              <div>Sunday : 8am to 7pm</div>
            </div>

            {/* rating and reviews */}
            {/* <div>
              <div className="text-unique pb-2 font-bold py-10 text-secondary">
                Rating and reviews
              </div>
              <div className="grid grid-cols-[1fr]">
                <div className="flex justify-center flex-col">
                  <div className="text-black font-extrabold base:text-[3rem] lg:text-[min(2vw,2rem)]">
                    4.5
                  </div>
                  <div className="flex">
                    <img className=" base:w-6 lg:w-3" src="/icons/star.svg" />
                    <img className="base:w-6 lg:w-3" src="/icons/star.svg" />
                    <img className="base:w-6 lg:w-3" src="/icons/star.svg" />
                    <img className=" base:w-6 lg:w-3" src="/icons/star.svg" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="w-full flex justify-end py-7">
            <CusButton
              text={"Book Now"}
              href={"/bookmechanic"}
              type={"primary"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleCard = ({ title, price }) => {
  return (
    <div className="rounded-lg p-4 gap-4 grid grid-cols-[1fr_1.3fr] bg-customwhite relative cursor-pointer">
      <img
        src="/services/dummy.png"
        className="rounded-lg w-full h-full object-cover "
      />
      <div className="gap-3 flex flex-col ">
        <div className="text-[1.4rem]">{title}</div>
        <div className="flex flex-col gap-2  text-[0.7rem] text-graycolor2">
          <IconText icon={"/icons/location.svg"} text={"Mehdipatnam"} />
          <IconText icon={"/icons/verified.svg"} text={"Verified"} />
          <IconText icon={"/icons/time.svg"} text={"8am to 5pm"} />
        </div>
        <div className="flex gap-1">
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
          <img className="w-4" src="/icons/star.svg" />
        </div>

        <div className="underline text-graycolor2">More info</div>
      </div>
      <div className="flex flex-col  absolute right-4 bottom-4 ">
        <div className="text-secondary font-semibold text-[1.2rem]">
          {price}
        </div>
        <div className="rounded-full font-semibold bg-primary text-customwhite text-[0.6rem] px-2 py-2">
          Book Now
        </div>
      </div>
    </div>
  );
};

const IconText = ({ icon, text }) => {
  return (
    <div className="flex gap-3 items-center">
      <img src={icon} className="w-4" />
      <div>{text}</div>
    </div>
  );
};
