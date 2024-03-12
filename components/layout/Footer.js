import Link from "next/link";
import React from "react";
import CusButton from "../section/button";

const Footer = () => {
  const navigationlinks = [
    {
      title: "Company",
      links: [
        {
          title: "About Us",
          href: "/aboutus",
        },
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "FAQ",
          href: "/",
        },
        {
          title: "Contact Us",
          href: "/",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          title: "About Us",
          href: "/aboutus",
        },
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "FAQ",
          href: "/",
        },
        {
          title: "Contact Us",
          href: "/",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          title: "About Us",
          href: "/aboutus",
        },
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "FAQ",
          href: "/",
        },
        {
          title: "Contact Us",
          href: "/",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          title: "About Us",
          href: "/aboutus",
        },
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "FAQ",
          href: "/",
        },
        {
          title: "Contact Us",
          href: "/",
        },
      ],
    },
  ];

  const socials = [
    {
      src: "/socials/facebook.svg",
      url: "/",
    },
    {
      src: "/socials/twitter.svg",
      url: "/",
    },
    {
      src: "/socials/vimeo.svg",
      url: "/",
    },
    {
      src: "/socials/youtube.svg",
      url: "/",
    },
  ];

  return (
    <div className="bg-primary flex justify-center w-full">
      <div className="w-[90%] max-w-[1440px] lg:text-[min(1rem,1vw)]">
        <div className="text-[2rem] py-[3rem] row-span-full text-customwhite col-start-1 col-end-13 font-semibold ">
          Auto<span className="text-secondary">connect</span>
        </div>
        {/*  */}
        <div className=" grid text-customwhite base:grid-cols-1 gap-y-10 lg:gap-y-0  lg:grid-cols-[1fr_1fr_1fr_1fr_1.3fr] lg:gap-6">
          {navigationlinks.map((data, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="font-semibold">{data.title}</div>
              <div className="flex flex-col gap-3 mt-3 ">
                {data.links.map((data, idx) => (
                  <Link
                    className="font-light hover:font-medium"
                    key={idx}
                    href={data.href}
                  >
                    {data.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* <div className="flex-col flex">
            <div className="pb-16">Become a Mechanic?</div>
            <CusButton text={"Subscribe"} type={"primary"} />
          </div> */}
        </div>

        {/* social links */}
        <div className="flex gap-[6vw] py-[7rem]">
          {socials.map((data, idx) => (
            <Link key={idx} href={data.url}>
              <img className="h-6" src={data.src} />
            </Link>
          ))}
        </div>

        {/* logo */}
      </div>
    </div>
  );
};

export default Footer;
