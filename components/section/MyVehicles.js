import React from 'react'

const MyVehicles = () => {
    const content = [
      {
        title: "Honda City",
        model: "Petrol 2022 Model",
      },
      {
        title: "Honda City",
        model: "Petrol 2022 Model",
      },
    ];
    return (
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex flex-col gap-6">
          {content.map((data, idx) => {
            return (
              <div
                key={idx}
                className="rounded-lg border border-gray-300 p-[1.5rem] gap-3 flex flex-col"
              >
                <div className="font-semibold text-[1.4rem]">{data.title}</div>
                <div className="text-graycolor2">{data.model}</div>
              </div>
            );
          })}
          <div className="rounded-lg border border-gray-300 p-[1.5rem] gap-3 flex flex-col">
            <div className="font-semibold text-[1.4rem]">No Vehicles Added</div>
            <div className="text-graycolor2">
              Trust our team of experienced mechanics to get your vehicle back in
              top condition. At AutoConnect, we offer a comprehensive range of
              mechanic services to keep your car running smoothly and reliably.
            </div>
          </div>
        </div>
      </div>
    );
  };

export default MyVehicles