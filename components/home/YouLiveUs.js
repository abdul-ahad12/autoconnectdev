import React from "react";
import TitleDesc from "../section/TitleDesc";

const YouLiveUs = () => {
  const testimonial = [
    {
      img: "/testimonial/dp1.jpg",
      name: "Leo",
      designation: "Lead Designer",
      title: "Outstanding Service!",
      desc: "I had a wonderful experience with the team. They were professional, timely, and exceeded all expectations. Their design ideas were innovative, and they really understood our brand vision. Highly recommend!",
      stars: 5,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Sophia",
      designation: "Marketing Manager",
      title: "Great Support and Expertise",
      desc: "The team provided exceptional support throughout the project. Their expertise in marketing strategies helped us grow our online presence significantly. We saw great results and will definitely work with them again.",
      stars: 4,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Michael",
      designation: "Business Analyst",
      title: "Very Professional",
      desc: "Working with them was seamless. They were organized, professional, and delivered the project ahead of schedule. The results were fantastic, and I appreciated their detailed approach to every task.",
      stars: 4,
    },
    {
      img: "/testimonial/dp1.jpg",
      name: "Emily",
      designation: "Product Manager",
      title: "Highly Satisfied",
      desc: "The quality of work was impressive, and the team was always willing to make necessary adjustments. Their dedication to client satisfaction is evident, and I’m thrilled with the final outcome of our product launch.",
      stars: 5,
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
        <div className="grid lg:grid-cols-4 gap-[2rem]     pt-[5rem]">
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
                    {/* <div className="flex gap-1 w-[2vw]">{renderStars(data.stars)}</div> */}
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
