// import React from "react";
// import RequestAdmin from "./RequestAdmin";

// const Requests = () => {
//   const requestData = [
//     {
//       orderNumber: "Request #2416",
//       dateTime: "Aug 17, 2024, 2:56:31 PM",
//       acmotor: "AC Motor",
//       service: "Mobile mechanic",
//     },
//     {
//       orderNumber: "Request #2416",
//       dateTime: "Aug 17, 2024, 2:56:31 PM",
//       acmotor: "AC Motor",
//       service: "Mobile mechanic",
//     },
//     {
//       orderNumber: "Request #2416",
//       dateTime: "Aug 17, 2024, 2:56:31 PM",
//       acmotor: "AC Motor",
//       service: "Mobile mechanic",
//     },
//     {
//       orderNumber: "Request #2416",
//       dateTime: "Aug 17, 2024, 2:56:31 PM",
//       acmotor: "AC Motor",
//       service: "Mobile mechanic",
//     },
//     // Add data for the remaining orders here...
//   ];
//   return (
//     <div>
//       <div className="grid  grid-cols-4 gap-x-16 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
//         <div>Request ID</div>
//         <div>Mechanic Name</div>
//         <div>Mechanic details</div>
//         <div></div>
//       </div>
//       <div className="flex flex-col gap-9">
//         {requestData.map((order, index) => (
//           <RequestAdmin
//             key={index}
//             acmotors={order.acmotor}
//             orderNumber={order.orderNumber}
//             dateTime={order.dateTime}
//             service={order.service}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Requests;

import React, { useState } from "react";
import RequestAdmin from "./RequestAdmin";

const Requests = () => {
  const requestData = [
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    {
      orderNumber: "Request #2416",
      dateTime: "Aug 17, 2024, 2:56:31 PM",
      acmotor: "AC Motor",
      service: "Mobile mechanic",
    },
    // Add data for the remaining orders here...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = requestData.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="grid  grid-cols-4 gap-x-16 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>Request ID</div>
        <div>Mechanic Name</div>
        <div>Mechanic details</div>
        <div></div>
      </div>
      <div className="flex flex-col gap-6">
        {currentData.map((order, index) => (
          <RequestAdmin
            key={index}
            acmotors={order.acmotor}
            orderNumber={order.orderNumber}
            dateTime={order.dateTime}
            service={order.service}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Requests;
