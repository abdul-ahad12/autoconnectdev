import React, { useState, useEffect } from "react";
import axios from "axios";
import CusButton from "./button";

const MechanicAvailability = ({ mechanicId }) => {
  const [availability, setAvailability] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [updatedAvailability, setUpdatedAvailability] = useState(null);
  const [orderedDaysOfWeek, setOrderedDaysOfWeek] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`/api/mechanic/getSingleMechanic`, {
          withCredentials: true,
        });

        setAvailability(response.data.mechanic.availability);
      } catch (error) {
        console.error("Error fetching mechanic availability:", error);
      }
    };

    fetchAvailability();
  }, [mechanicId]);

  // Default to today's day
  useEffect(() => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const dayOfWeekIndex = today.getDay(); // Returns 0 for Sunday, 1 for Monday, etc.
    const todayDay = daysOfWeek[dayOfWeekIndex];
    setSelectedDay(todayDay);

    // Reorder days of the week array based on today's index
    const reorderedDaysOfWeek = [
      ...daysOfWeek.slice(dayOfWeekIndex),
      ...daysOfWeek.slice(0, dayOfWeekIndex),
    ];

    setOrderedDaysOfWeek(reorderedDaysOfWeek);
  }, []);

  const handleDayClick = (day) => {
    // Handle click on a specific day
    setSelectedDay(day);
  };

  // Update availability status for the selected time slot
  const updateTimeSlotAvailability = (timeSlot) => {
    const updatedAvailability = { ...availability };
    const updatedTimings = [...updatedAvailability[selectedDay].timings];

    if (updatedTimings.includes(timeSlot)) {
      // Remove the time slot
      const index = updatedTimings.indexOf(timeSlot);
      updatedTimings.splice(index, 1);
    } else {
      // Add the time slot
      updatedTimings.push(timeSlot);
    }

    // Update the availability in the state
    updatedAvailability[selectedDay].timings = updatedTimings;
    setUpdatedAvailability(updatedAvailability);
  };

  const handleUpdateAvailability = async () => {
    try {
      // Send a request to update the availability on the backend
      await axios.post(`/api/mechanic/updateAvailability`, {
        availability: updatedAvailability,
      });
      setAvailability(updatedAvailability);
      console.log("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  // Generate timing slots from 8:00 to 20:00 with 2-hour increments
  const timingSlots = [];
  for (let i = 8; i < 20; i += 2) {
    const startHour = i < 10 ? `0${i}` : `${i}`;
    const endHour = i + 2 < 10 ? `0${i + 2}` : `${i + 2}`;
    timingSlots.push(`${startHour}:00-${endHour}:00`);
  }

  return (
    <div className="mt-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Mechanic Availability</h2>
      <div className="flex w-full lg:flex-row base:flex-col gap-3   lg:space-x-2 mb-4">
        {orderedDaysOfWeek.map((day,idx) => (
          <div
          key={idx}
            onClick={() => handleDayClick(day)}
            className={`lg:px-6 lg:py-4 base:py-3 rounded flex flex-col gap-1 items-center border ${
              selectedDay === day ? "border-secondary " : " text-gray-700"
            }`}
          >
            <button key={day}>{day}</button>
            <p className="text-[1.6rem] font-medium">11</p>
            <p>orders</p>
          </div>
        ))}
      </div>
      {selectedDay && (
        <div className="flex flex-col gap-7">
          <h3 className="font-semibold">{selectedDay}</h3>
          <div className="base:flex  base:flex-col lg:grid lg:grid-cols-3  base:gap-4 lg:gap-x-20 lg:gap-y-7">
            {timingSlots.map((timeSlot, index) => (
              <div
                key={index}
                className={`
                px-3 py-2 rounded-lg   border w-
                ${
                  availability[selectedDay]?.timings.includes(timeSlot)
                    ? "bg-orange-100 cursor-pointer"
                    : "bg-white cursor-pointer"
                }`}
                onClick={() => updateTimeSlotAvailability(timeSlot)}
              >
                {timeSlot}
              </div>
            ))}
          </div>
          {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleUpdateAvailability}
        >
          Update Availability
        </button> */}
          <div className="flex w-full items-center lg:justify-center">
            <CusButton
              onClick={handleUpdateAvailability}
              text={"Update"}
              type={"secondary"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicAvailability;
