import React, { useEffect, useState } from "react";
import CusButton from "../section/button";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";
import Image from "next/image";
import MobileLogo from "../../public/navbar/mobile.svg";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  console.log(userData);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCustomer, setIsCustomer] = useState(null);
  const [isMechanic, setIsMechanic] = useState(null);

  console.log("admin", isAdmin);
  console.log("customer", isCustomer);
  console.log("isMechanic", isMechanic);

  useEffect(() => {
    axios
      .get("/api/roles/admin", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setIsAdmin(true);
        } else {
          console.log("here"); // Redirect to login page if not authorized
        }
      })
      .catch((error) => {
        console.error("Error checking admin role:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/roles/customer", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setIsCustomer(true);
        } else {
          console.log("here"); // Redirect to login page if not authorized
        }
      })
      .catch((error) => {
        console.error("Error checking customer role:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/roles/mechanic", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setIsMechanic(true);
        } else {
          console.log("here"); // Redirect to login page if not authorized
        }
      })
      .catch((error) => {
        console.error("Error checking mechanic role:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      if (accessToken && id && role) {
        setIsLoggedIn(true);
        setUserData({ id, role });
      }
      setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, []);
  const [loggedin, setloggedin] = useState(false);
  // mobile navbar
  const [mobileNav, setmobileNav] = useState(false);

  const handleMobileNavbar = () => {
    setmobileNav(!mobileNav);
  };
  //

  useEffect(() => {
    if (isLoggedIn == true) {
      setloggedin(true);
    }
    setloggedin(false);
  }, [isLoggedIn, router]);

  const menu = [
    {
      title: "About",
      href: "/aboutus",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "FAQ's",
      href: "/aboutus#faqs",
    },
    {
      title: "Contact Us",
      href: "/aboutus#contactus",
    },
  ];
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  
    // Clear cookies
    document.cookie = "access-token=; path=/;";
    document.cookie = "refresh-token=; path=/;";
  
    // Redirect to login page
    router.push("/login");
  };
  

  return (
    <div
      className={`w-full text-graycolor bg-primary flex justify-center py-[1rem] ${
        !isCustomer && "absolute"
      }   top-0 z-20`}
    >
      <div className="w-[90%] grid grid-cols-12">
        {/* logo */}
        <Link
          href={
            isCustomer
              ? "/"
              : isAdmin
              ? "#"
              : isMechanic
              ? "#"
              : "/"
          }
          className="lg:text-[2rem] base:text-[1.2rem] z-50 row-span-full col-start-1 col-end-3 font-semibold "
        >
          Auto<span className="text-secondary">connect</span>
        </Link>
        {/* mobile hamburger */}
        <div
          className="lg:hidden col-start-13 flex items-center"
          onClick={handleMobileNavbar}
        >
          {mobileNav ? (
            <div className="">-</div>
          ) : (
            <div class=" curser-pointer">
              <Image alt="mobilelogo" src={MobileLogo} />
            </div>
          )}
        </div>

        {isCustomer && mobileNav == true && (
          <div class="flex flex-col gap-8 h-screen min-w-[300px] lg:hidden">
            <div className="flex flex-col gap-6 mt-10 ">
              {menu.map((data, idx) => (
                <Link
                  href={data.href}
                  key={idx}
                  className="z-50 hover:scale-[1.01]"
                >
                  {data.title}
                </Link>
              ))}
            </div>

            {isLoggedIn ? (
              <div className="lg:hidden ">
                <div
                  className="cursor-pointer  text-white"
                  onClick={handleLogout}
                >
                  Sign Out
                </div>
                <CusButton
                  type={"primary"}
                  text={"Dashboard"}
                  href={"/customerDashboard"}
                />
              </div>
            ) : (
              <div className="lg:hidden base:flex flex-col gap-5 ">
                {/* <Link href={"/login"}>Sign In</Link> */}
                <CusButton
                  type={"secondary"}
                  text={"Sign In"}
                  href={"/login"}
                />

                <CusButton type={"primary"} text={"Sign Up"} href={"/signup"} />
              </div>
            )}
          </div>
        )}

        {isCustomer && (
          <div className="row-span-full col-start-1 col-end-13 base:hidden lg:flex gap-7 justify-center items-center font-normal text-[min(1rem,1vw)] ">
            {menu.map((data, idx) => (
              <Link
                href={data.href}
                key={idx}
                className="z-50 hover:scale-[1.01]"
              >
                {data.title}
              </Link>
            ))}
          </div>
        )}

        {/* buttons */}
        {isLoggedIn ? (
          <div className=" base:hidden lg:flex lg:gap-6 lg:row-span-full lg:items-center lg:justify-end lg:col-start-1 lg:col-end-13">
            <div className="cursor-pointer" onClick={handleLogout}>
              Sign Out
            </div>{" "}
            {isCustomer && (
              <CusButton
                type={"primary"}
                text={"Dashboard"}
                href={
                  isCustomer
                    ? "/customerDashboard"
                    : isAdmin
                    ? "/admin/requestadmin"
                    : isMechanic
                    ? "/mechanic/mechanicDashboard"
                    : "/"
                }
              />
            )}
            {!isCustomer && (
              <CusButton href={"#"} type={"primary"} text={"042 9023989"} />
            )}
          </div>
        ) : (
          <div className="base:hidden lg:flex gap-6 row-span-full items-center justify-end col-start-1 col-end-13">
            <Link href={"/login"} className="">
              Sign In
            </Link>
            <CusButton type={"primary"} text={"Sign Up"} href={"/signup"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
