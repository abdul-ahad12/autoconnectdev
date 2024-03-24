import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const RequestAdmin = ({
  orderNumber,
  dateTime,
  acmotors,
  index,
  mechanicid,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(mechanicid);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleApprove = (mechanicid) => {
    // Use Swal to confirm before hitting the route
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, hit the route
        // Replace 'mechanicid' with the actual id you want to send
        axios
          .put(`/api/admin/approve/${mechanicid}?approve=true`)
          .then((response) => {
            if (response) {
              // If request succeeds, show success message
              Swal.fire(
                "Approved!",
                "The request has been approved.",
                "success"
              );
            } else {
              console.log(response);
              // If request fails, show error message
              Swal.fire("Error!", "Failed to approve the request.", "error");
            }
          })
          .catch((error) => {
            console.error("Error approving request:", error);
            Swal.fire(
              "Error!",
              "An error occurred while approving the request.",
              "error"
            );
          });
      }
    });
  };
  const handleCloseModal = (mechanicid) => {
    // Use Swal to confirm before hitting the route
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, hit the route
        // Replace 'mechanicid' with the actual id you want to send
        axios
          .put(`/api/admin/approve/${mechanicid}?approve=false`)
          .then((response) => {
            if (response) {
              // If request succeeds, show success message
              Swal.fire(
                "Approved!",
                "The request has been approved.",
                "success"
              );
            } else {
              console.log(response);
              // If request fails, show error message
              Swal.fire("Error!", "Failed to approve the request.", "error");
            }
          })
          .catch((error) => {
            console.error("Error approving request:", error);
            Swal.fire(
              "Error!",
              "An error occurred while approving the request.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="grid base:grid-cols-2 lg:grid-cols-4 gap-x-16 items-center border-[1px] py-3 px-3 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="text-[0.9rem] font-semibold">#0{index}</div>
        <div className="text-[0.6rem]">{dateTime}</div>
      </div>
      <button className="text-primary w-fit text-[1rem] rounded-md font-semibold">
        <span className="bg-graycolor text-graycolor2 text-[0.6rem] rounded-full p-2 border-2 font-medium mr-1">
          {acmotors}
        </span>
      </button>
      <button className="text-primary w-fit text-[0.8rem] border-2 rounded-md p-1">
        Click here
      </button>
      <div className="flex gap-3">
        <button
          onClick={() => handleApprove(mechanicid)}
          className="text-secondary border-secondary border-[1px] px-2 py-1 rounded-md"
        >
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
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                cancel
              </button>
              <button
                className="mt-4 bg-secondary text-white px-4 py-2 rounded-full"
                onClick={() => handleCloseModal(mechanicid)}
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
