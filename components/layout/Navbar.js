import React from "react";
import CusButton from "../section/button";
import Link from "next/link";

const Navbar = () => {
  const menu = [
    {
      title: "About",
      href: "#",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "FAQ's",
      href: "#",
    },
    {
      title: "Contact Us",
      href: "#",
    },
  ];

  return (
    <div className="w-full text-graycolor bg-primary flex justify-center py-[1rem] z-20">
      <div className="w-[90%] grid grid-cols-12">
        {/* logo */}
        <Link
          href="/"
          className="text-[2rem] z-50 row-span-full col-start-1 col-end-3 font-semibold "
        >
          Auto<span className="text-secondary">connect</span>
        </Link>

        {/* menu */}
        <div className="row-span-full col-start-1 col-end-13 base:hidden lg:flex gap-7 justify-center items-center font-normal text-[min(1rem,1vw)] ">
          {menu.map((data, idx) => (
            <Link href={data.href} key={idx} className="z-50 hover:scale-[1.01]">{data.title}</Link>
          ))}
        </div>

        {/* buttons */}

        <div className="base:hidden lg:flex gap-6 row-span-full items-center justify-end col-start-1 col-end-13">
          <Link href={"/login"}>Sign In</Link>
          <CusButton type={"primary"} text={"Sign Up"} href={"/signup"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
