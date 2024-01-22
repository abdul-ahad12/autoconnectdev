import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MechanicTop from "@/components/mechanic/MechanicTop";
import Description from "@/components/section/Description";
import TitleDesc from "@/components/section/TitleDesc";
import CusButton from "@/components/section/button";
import { Calendar } from "@/components/ui/common/Calender";
import React from "react";

const Bookmechanic = () => {
  const [date, setDate] = React.useState(new Date());
  const typeofdelivery = [
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
    {
      img: "/mechanic/tools.png",
      title: "Self Pick-up and Drop",
      desc: "Pick and drop with your convenience in the given time slot .",
    },
  ];

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Navbar />
      <div className="w-[90%]">
        <MechanicTop
          title={"Isra , you’re just a few steps"}
          titleColor={" away!"}
        />
        <div className="w-full flex gap-6 relative  my-7">
          <div className="w-[65%]    ">
            {/* left side */}
            <div className="flex justify-between rounded-t-[2rem] lg:p-[2rem] bg-customwhite gap-16">
              <div className="w-[50%]  flex flex-col gap-3">
                <div className="text-[1.5rem] font-semibold">
                  When do you wish to get the{" "}
                  <span className="text-secondary">service </span>done ?
                </div>
                <div className="w-[70%] h-[0.1px] bg-graycolor2"></div>
                <div className="text-secondary text-[1.2rem]">
                  <span className="text-black">Prefered</span> Time Slot
                </div>
                <select className="input-class w-[50%]">
                  <option>10:00 am</option>
                  <option>10:00 am</option>
                  <option>10:00 am</option>
                  <option>10:00 am</option>
                  <option>10:00 am</option>
                  <option>10:00 am</option>
                </select>
              </div>
              {/* right side */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border h-fit shadow"
              />
            </div>
            <div className="text-[1.5rem] font-semibold bg-customwhite p-[2rem] rounded-b-[2rem]">
              <div>
                {" "}
                Add the <span className="text-secondary">
                  mode of delivery
                </span>{" "}
                to complete your booking
              </div>

              {/* mode of delivery select fields */}
              <div className="flex flex-col gap-3">
                {typeofdelivery.map((data, idx) => (
                  <div key={idx} className="p-[1rem] flex justify-between w-full rounded-lg shadow-md ">
                    <div className="flex gap-4 items-center">
                      <img className="h-full" src={data.img} />
                      <div className="flex flex-col  text-primary">
                        <div className="font-bold text-[1rem]">
                          {data.title}
                        </div>
                        <div className="font-medium text-[0.7rem]">
                          {data.desc}
                        </div>
                      </div>
                    </div>
                    <input type="radio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="my-5 bg-customwhite rounded-[2rem] p-[2rem]">
              <div className="text-[1.5rem] font-semibold">
                {" "}
                Confirm Your <span className="text-secondary">
                  booking.
                </span>{" "}
              </div>
              <form className="flex w-full flex-col gap-2 py-[2rem]">
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
                  <CusButton type={"primary"} text={"Confirm"} />
                </div>
              </form>
            </div>
          </div>

          {/* right */}
          <div className="w-[35%]  h-fit bg-customwhite rounded-[2rem]">
            <img className="rounded-[2rem]" src="/mechanic/dummy.jpg" />
            <div className="flex flex-col  px-[5%] py-3">
              <div className="flex justify-between items-center py-4">
                {" "}
                <div className="text-[1.3rem]">AC Motors</div>
                <svg
                  className="w-3"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 14.8464V18.7526H3.90625L15.4271 7.23177L11.5208 3.32552L0 14.8464ZM18.4479 4.21094C18.8542 3.80469 18.8542 3.14844 18.4479 2.74219L16.0104 0.304688C15.6042 -0.101563 14.9479 -0.101563 14.5417 0.304688L12.6354 2.21094L16.5417 6.11719L18.4479 4.21094Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="text-[1rem] px-3 py-5 rounded-lg shadow-md flex justify-between mt-7">
                <div> Services</div>
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.7169 9.62474C18.0944 10.0021 18.0944 10.6141 17.7169 10.9915L13.5372 15.1712C12.688 16.0204 11.3111 16.0204 10.4619 15.1711L6.283 10.9914C5.90562 10.614 5.90567 10.0021 6.28312 9.62472L6.62483 9.28307C7.00227 8.90569 7.61417 8.90575 7.99155 9.28319L11.9996 13.292L16.0085 9.28306C16.3859 8.90565 16.9979 8.90565 17.3753 9.28306L17.7169 9.62474Z"
                    fill="#BBC4CD"
                  />
                </svg>
              </div>
              <div className="text-[1rem] px-3 py-5 rounded-lg shadow-md flex justify-between">
                <div>Extras</div>
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.7169 9.62474C18.0944 10.0021 18.0944 10.6141 17.7169 10.9915L13.5372 15.1712C12.688 16.0204 11.3111 16.0204 10.4619 15.1711L6.283 10.9914C5.90562 10.614 5.90567 10.0021 6.28312 9.62472L6.62483 9.28307C7.00227 8.90569 7.61417 8.90575 7.99155 9.28319L11.9996 13.292L16.0085 9.28306C16.3859 8.90565 16.9979 8.90565 17.3753 9.28306L17.7169 9.62474Z"
                    fill="#BBC4CD"
                  />
                </svg>
              </div>
              <div className="w-full flex justify-center pt-8">
                <CusButton type={"secondary"} text={"Book Mechanic"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Bookmechanic;
