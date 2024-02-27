import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Auth from "@/components/section/Auth";
import Description from "@/components/section/Description";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import swal from "sweetalert";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [passwordError, setPasswordError] = useState(""); // Add passwordError state
  const isMechanic = router.query.mechanic === "true";

  useEffect(() => {
    // Check if there is an active session
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/login"); // Redirect to home page if session exists
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
    setIsLoading(true); // Set isLoading to true when signing up
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // Access the tokens from the response
        const { accessToken, refreshToken } = data;
        // Store tokens in localStorage or session storage as needed
        const userData = decodeAccessToken(accessToken);
        console.log(userData); // Access user id

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("id", userData.id);
        localStorage.setItem("role", userData.role);

        setIsLoading(false); // Set isLoading to false after successful signup

        if (isMechanic) {
          router.push("/mechanic/form");
        } else {
          swal(
            "Signup successful!",
            "You have successfully signed up.",
            "success"
          ); // Display SweetAlert success message
          router.push("/login"); // Redirect to success page or any desired page upon successful signup
        }
      } else {
        const data = await response.json();
        // Check if the error message indicates that the user already exists
        if (data.message === "User already exists") {
          swal("Signup failed!", "User already exists.", "error");
          if (isMechanic) {
            router.push("/login?mechanic=true");
          }
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Display SweetAlert error message
      swal("Signup failed!", error.message, "error");
      // Handle signup failure, e.g., display error message to the user
    } finally {
      setIsLoading(false); // Set isLoading to false after signup completion or failure
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!re.test(password)) {
      // setPasswordError(
      //   "Password must be at least 8 characters long and contain at least one number and one special character"
      // );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    validatePassword(value);
    handleChange(e);
  };

  return (
    <>
      <Navbar />
      <Auth>
        <div className="text-black w-[65%] text-[min(2rem,2vw)] font-semibold flex flex-col">
          <div> Create Account</div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Form inputs */}
            <div className="flex gap-2 mt-4">
              <div className="flex flex-col w-full gap-1">
                <Description text={"First Name"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <Description text={"Last Name"} />
                <input
                  className="input-class border w-full border-graycolor2"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description text={"Email"} />
              <input
                className={`input-class border w-full border-graycolor2 ${
                  validateEmail(formData.email) ? "" : "border-red-500"
                }`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description text={"Phone Number"} />
              <input
                className={`input-class border w-full border-graycolor2 ${
                  validatePhoneNumber(formData.phoneNumber)
                    ? ""
                    : "border-red-500"
                }`}
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Description text={"Password"} />
              <input
                className={`input-class border w-full border-graycolor2 ${
                  passwordError ? "border-red-500" : ""
                }`}
                type="password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long and contain at least
                one number and one special character
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Loading..." : "Sign Up"}{" "}
                {/* Display loading text when loading */}
              </button>
            </div>
          </form>
        </div>
      </Auth>
      <Footer />
    </>
  );
};

export default Signup;
