// import React, { useState } from "react";

// function DateScroll() {
//   // Get today's date
//   const today = new Date();

//   // Calculate yesterday and upcoming 5 days
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   const upcomingDates = [];
//   for (let i = 1; i <= 5; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);
//     upcomingDates.push(date);
//   }

//   // State for displayed dates
//   const [displayedDates, setDisplayedDates] = useState([
//     yesterday,
//     today,
//     ...upcomingDates,
//   ]);

//   // Function to shift displayed dates to the left
//   const shiftLeft = () => {
//     const newDates = [...displayedDates];
//     newDates.pop(); // Remove the last date
//     newDates.unshift(new Date(newDates[0].getTime() - 24 * 60 * 60 * 1000)); // Add a new date at the beginning
//     setDisplayedDates(newDates);
//   };

//   // Function to shift displayed dates to the right
//   const shiftRight = () => {
//     const newDates = [...displayedDates];
//     newDates.shift(); // Remove the first date
//     newDates.push(
//       new Date(newDates[newDates.length - 1].getTime() + 24 * 60 * 60 * 1000)
//     ); // Add a new date at the end
//     setDisplayedDates(newDates);
//   };

//   return (
//     <div className="flex items-center gap-5">
//       {/* Left button */}
//       <button
//         className="bg-graycolor rounded-full  text-black  font-bold w-10 h-10"
//         onClick={shiftLeft}
//       >
//         &#x2190;
//       </button>

//       {/* Displayed dates */}
//       <div className="flex border-[1px] border-graycolor rounded-lg">
//         {displayedDates.map((date) => (
//           <div
//             key={date.toISOString()}
//             className="border p-8 items-center flex flex-col  border-gray-300 rounded-lg m-2 "
//           >
//             <div className="font-normal text-graycolor2">
//               {date.toLocaleString("default", { weekday: "short" })}
//             </div>
//             <div className="text-[1.5rem] ">{date.getDate()}</div>
//           </div>
//         ))}
//       </div>

//       {/* Right button */}
//       <button
//         className="bg-graycolor  rounded-full  text-black font-bold w-10 h-10"
//         onClick={shiftRight}
//       >
//         &#x2192;
//       </button>
//     </div>
//   );
// }

// export default DateScroll;

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
    <div className="flex flex-col gap-7">
      {/* Month selector */}
      <select className="border w-fit py-1 px-4 rounded-md">
        <option value={0}>January</option>
        <option value={1}>February</option>
        {/* Add other months here */}
      </select>

      <div className="flex items-center gap-5">
        {/* Left button */}
        <button
          className="bg-graycolor rounded-full text-black font-bold w-10 h-10"
          onClick={shiftLeft}
        >
          &#x2190;
        </button>

        {/* Displayed dates */}
        <div className="flex border-[1px] border-graycolor rounded-lg">
          {displayedDates.map((date) => (
            <div
              key={date.toISOString()}
              className="border p-8 items-center flex flex-col border-gray-300 rounded-lg m-2"
            >
              <div className="font-normal text-graycolor2">
                {date.toLocaleString("default", { weekday: "short" })}
              </div>
              <div className="text-[1.5rem]">{date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Right button */}
        <button
          className="bg-graycolor rounded-full text-black font-bold w-10 h-10"
          onClick={shiftRight}
        >
          &#x2192;
        </button>
      </div>

      {/* Time slots */}
      <div className="w-[70%] grid grid-rows-2 grid-cols-3 mt-10   gap-6  flex-wrap">
        {/* Render your time slots here */}
        {/* Example: */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="border rounded-lg  p-2 m-1">
            {`${i < 10 ? "0" + i : i}:00 - ${
              i + 1 < 10 ? "0" + (i + 1) : i + 1
            }:00`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateScroll;
