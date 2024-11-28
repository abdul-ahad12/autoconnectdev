// components/MyProfile.jsx

import React, { useEffect, useState } from "react";
import Description from "./Description";
import { fetchUserData, updateUserData } from "../../lib/utils";
import { formatDate } from "../../lib/supportingFncs";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    name: "",
    phoneNumber: "",
    alternate: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserData();
      if (response) {
        setUserData(response);
        setEditableData({
          name: response.name || "",
          phoneNumber: response.phoneNumber || "",
          alternate: response.alternate || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedUser = await updateUserData(editableData);
      if (updatedUser) {
        setUserData(updatedUser);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center p-6  min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-lg py-10 px-8 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

        {/* Toast Container */}
        {/* <ToastContainer /> */}

        {/* Profile Form */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSave}>
          {/* Name */}
          <div>
            <Description text="Name" size="inputlabel" />
            <input
              type="text"
              name="name"
              value={editableData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Address (Read-Only) */}
          <div>
            <Description text="Email Address" size="inputlabel" />
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full p-3 border border-gray-400 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Description text="Phone Number" size="inputlabel" />
            <input
              type="tel"
              name="phoneNumber"
              value={editableData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Alternate */}
          <div>
            <Description text="Alternate Phone Number" size="inputlabel" />
            <input
              type="tel"
              name="alternate"
              value={editableData.alternate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Account Created On (Read-Only) */}
          <div>
            <Description text="Account Created On" size="inputlabel" />
            <input
              type="text"
              value={formatDate(userData.createdAt)}
              readOnly
              className="w-full p-3 border border-gray-400 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Optional: Change Password or Other Features */}
        {/* <div className="text-secondary font-semibold text-lg py-6 cursor-pointer">
          Forgot Password?
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
