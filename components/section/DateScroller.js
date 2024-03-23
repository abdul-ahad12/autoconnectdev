import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Mechanic Availability</h2>
      <div className="flex space-x-2 mb-4">
        {orderedDaysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`px-4 py-2 rounded ${
              selectedDay === day
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDay && (
        <div>
          <h3 className="font-semibold">{selectedDay}</h3>
          <div className="flex gap-4">
            {timingSlots.map((timeSlot, index) => (
              <div
                key={index}
                className={`
                  px-3 py-2
                  ${
                    availability[selectedDay]?.timings.includes(timeSlot)
                      ? "bg-green-200 cursor-pointer"
                      : "bg-gray-200 cursor-pointer"
                  }`}
                onClick={() => updateTimeSlotAvailability(timeSlot)}
              >
                {timeSlot}
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleUpdateAvailability}
          >
            Update Availability
          </button>
        </div>
      )}
    </div>
  );
};

export default MechanicAvailability;
