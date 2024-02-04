import React from 'react'

const Order = () => {
    return (
      <div className="p-[1.2rem] w-full bg-white rounded-lg flex flex-col border-gray-300 border  z-50">
        <div className="w-full  flex justify-between items-center">
          <div className="text-[1.3rem]">Order #2416</div>
          <div className="flex gap-2">
            <div className="flex items-center rounded-md border border-gray-500 gap-2 px-2 py-1">
              <div className="w-1 h-1 bg-red-600" />
              <div>Await payment</div>
            </div>
            <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2">
              <div className="w-1 h-1 bg-blue-700" />
              <div>Await delivery</div>
            </div>
            <div className="flex justify-center items-center rounded-md border-gray-500 border">
              <img src="/icons/dotted.png" />
            </div>
          </div>
        </div>
        <div className="my-2 flex gap-3 items-center">
          <div>Aug 17, 2024, 2:56:31 PM</div>
          <div>from</div>
          <div className="font-medium">AC Motors</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col my-6">
            <div className="font-medium text-[1rem]">Isra Azizunnisa</div>
            <div className="text-gray-400">isra.aziz@yahoo.com</div>
          </div>
          <div className="flex items-center rounded-md border-gray-500 border px-2 py-1 gap-2 ">
            <div className="w-1 h-1 bg-blue-700" />
            <div>Await delivery</div>
          </div>
        </div>
      </div>
    );
  };

export default Order