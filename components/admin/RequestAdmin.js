import React, { useState } from "react";

const RequestAdmin = ({ orderNumber, dateTime, acmotors,index }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="grid grid-cols-4 gap-x-16 items-center border-[1px] py-3 px-3 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="text-[0.9rem] font-semibold">#0{index}</div>
        <div className="text-[0.6rem]">{dateTime}</div>
      </div>
      <button className="text-primary w-fit text-[1rem] rounded-md font-semibold">
        <span className="bg-graycolor text-graycolor2 text-[0.6rem] rounded-full p-2 border-2 font-medium mr-1">
          AC
        </span>
        {acmotors}
      </button>
      <button className="text-primary w-fit text-[0.8rem] border-2 rounded-md p-1">
        Click here
      </button>
      <div className="flex gap-3">
        <button className="text-secondary border-secondary border-[1px] px-2 py-1 rounded-md">
          Approve
        </button>
        <button
          onClick={handleButtonClick}
          className="text-primary border-primary border-[1px] px-2 py-1 rounded-md"
        >
          Reject
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-graycolor2/90 backdrop-blur-xl opacity-70"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-sm w-[100%]">
            <h2 className="text-xl font-semibold mb-4">
              Rejection <span className="text-secondary">reason</span>
            </h2>
            <textarea
              className="w-full placeholder: border-[1px] rounded-xl h-44 p-2"
              placeholder="write something... "
            />
            <div className="flex gap-2 justify-end">
              <button
                className="mt-4 text-primary bg-graycolor px-4 py-2 rounded-full"
                onClick={handleCloseModal}
              >
                cancel
              </button>
              <button
                className="mt-4 bg-secondary text-white px-4 py-2 rounded-full"
                onClick={handleCloseModal}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAdmin;
