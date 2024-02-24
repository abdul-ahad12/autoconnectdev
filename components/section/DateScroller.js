import React, { useState } from "react";

function DateScroll() {
  // Get today's date
  const today = new Date();

  // Calculate yesterday and upcoming 5 days
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const upcomingDates = [];
  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    upcomingDates.push(date);
  }

  // State for displayed dates
  const [displayedDates, setDisplayedDates] = useState([
    yesterday,
    today,
    ...upcomingDates,
  ]);

  // Function to shift displayed dates to the left
  const shiftLeft = () => {
    const newDates = [...displayedDates];
    newDates.pop(); // Remove the last date
    newDates.unshift(new Date(newDates[0].getTime() - 24 * 60 * 60 * 1000)); // Add a new date at the beginning
    setDisplayedDates(newDates);
  };

  // Function to shift displayed dates to the right
  const shiftRight = () => {
    const newDates = [...displayedDates];
    newDates.shift(); // Remove the first date
    newDates.push(
      new Date(newDates[newDates.length - 1].getTime() + 24 * 60 * 60 * 1000)
    ); // Add a new date at the end
    setDisplayedDates(newDates);
  };

  return (
    <div className="flex items-center gap-5">
      {/* Left button */}
      <button
        className="bg-graycolor rounded-full  text-black font-bold w-9 h-9"
        onClick={shiftLeft}
      >
        &#x2190;
      </button>

      {/* Displayed dates */}
      <div className="flex border-[1px] border-graycolor rounded-lg">
        {displayedDates.map((date) => (
          <div
            key={date.toISOString()}
            className="border w-[70px] items-center flex flex-col  border-gray-300 rounded-lg m-2 p-2"
          >
            <div className="font-normal">
              {date.toLocaleString("default", { weekday: "short" })}
            </div>
            <div>{date.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Right button */}
      <button
        className="bg-graycolor rounded-full  text-black font-bold w-9 h-9"
        onClick={shiftRight}
      >
        &#x2192;
      </button>
    </div>
  );
}

export default DateScroll;
