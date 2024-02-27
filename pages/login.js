import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Auth from "@/components/section/Auth";
import Description from "@/components/section/Description";
import { useRouter } from "next/router";
import swal from "sweetalert";
import jwt from "jsonwebtoken";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Check if there is an active session
    const id = localStorage.getItem("id");
    if (id!==undefined) {
      router.push("/"); // Redirect to home page if session exists
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const decodeAccessToken = (accessToken) => {
    try {
      const decodedToken = jwt.decode(accessToken);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding access token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const { accessToken } = data;

        // Decode access token and store user details in localStorage
        const userData = decodeAccessToken(accessToken);
        console.log(userData); // Access user id

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("id", userData.id);
        localStorage.setItem("role", userData.role);
        swal("Login successful!", "You have successfully logged in.", "success");
        
        // Redirect to mechanic form if query parameter mechanic is true
        if (router.query.mechanic === 'true') {
          router.push("/mechanic/form");
        } else {
          router.push("/"); // Redirect to home page after successful login
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      swal("Login failed!", error.message, "error");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <Navbar />
      <Auth>
        <div className="text-black w-[65%] text-[min(2rem,2vw)] font-semibold flex flex-col justify-center">
          <div> Login</div>
          <form className="flex flex-col gap-5 py-8" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1">
              <Description text={"Email Address"} />
              <input
                className="input-class border w-full border-graycolor2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description text={"Password"} />
              <input
                className="input-class border w-full border-graycolor2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </Auth>
      <Footer />
    </>
  );
};

export default Login;
