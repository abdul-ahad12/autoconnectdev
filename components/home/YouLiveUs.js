import React, { useEffect, useRef } from "react";
import TitleDesc from "../section/TitleDesc";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap, { Power3 } from "gsap";

const YouLiveUs = () => {
  gsap.registerPlugin(ScrollTrigger);
  const testimonialsRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: Power3.easeInOut } });

    tl.fromTo(
      testimonialsRef.current.children,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.2 }
    );

    ScrollTrigger.create({
      trigger: testimonialsRef.current,
      animation: tl,
      start: "top bottom",
      end: "bottom center",
      // scrub: 1,
      // markers: true,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const testimonial = [
    {
      img: "/testimonial/dp1.jpg",
      name: "Leo",
      designation: "Lead Designer",
      title: "It was a very good experience",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
      stars: 4,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Leo",
      designation: "Lead Designer",
      title: "It was a very good experience",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
      stars: 4,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Leo",
      designation: "Lead Designer",
      title: "It was a very good experience",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
      stars: 4,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Leo",
      designation: "Lead Designer",
      title: "It was a very good experience",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
      stars: 4,
    },
  ];
  const renderStars = (stars) => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(<img src={"/testimonial/star.svg"} key={i} />); // Using a star symbol here, you can replace it with your preferred star icon or component
    }
    return starIcons;
  };

  return (
    <div className="py-[6rem] bg-graycolor flex items-center flex-col relative">
      <div className="w-[90%]">
        <TitleDesc
          title={"YOU WILL LOVE US JUST LIKE"}
          titleColor={"OTHERS DO!"}
        />
        <div
          ref={testimonialsRef}
          className="grid lg:grid-cols-4 gap-[2rem] pt-[5rem]"
        >
          {testimonial.map((data, idx) => (
            <div
              key={idx}
              className="lg:p-[2vw] p-[1.5rem] bg-customwhite rounded-lg flex flex-col gap-4"
            >
              <div className="flex gap-4 items-center">
                <img className="w-[3rem] lg:w-[5vw]" src={data.img} />
                <div className="flex flex-col">
                  <div className="text-[1.5rem] font-semibold">{data.name}</div>
                  <div className="flex lg:flex-row base:flex-col gap-3">
                    <div className="text-[0.6rem]">{data.designation}</div>
                    <div className="flex gap-1">{renderStars(data.stars)}</div>
                  </div>
                </div>
              </div>
              <div className="lg:text-center">
                <div className="font-semibold base:text-[1.2rem] lg:text-[min(1.2rem,1.2vw)]">
                  {data.title}
                </div>
                <div className="text-[0.8rem] mt-4">{data.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouLiveUs;
