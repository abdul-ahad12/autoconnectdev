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

import React, { useEffect, useState } from "react";
import RequestAdmin from "./RequestAdmin";

const Requests = () => {
  const [mechanics, setMechanics] = useState([]);
  console.log(mechanics);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchMechanics() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/getAllMechanicsForApproval?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mechanics");
        }
        const data = await response.json();
        setMechanics(data.mechanics);
        setTotalCount(data.totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
      }
    }

    fetchMechanics();
  }, [currentPage]);

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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mechanics.length / itemsPerPage);

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
      <div className="base:hidden lg:grid  grid-cols-4 gap-x-16 items-center text-[0.7rem]  py-3 px-2 rounded-lg">
        <div>Request ID</div>
        <div>Mechanic Name</div>
        <div>Mechanic details</div>
        <div></div>
      </div>
      <div className="flex flex-col gap-6">
        {mechanics &&
          mechanics.map((order, index) => (
            <div key={index}>
              <RequestAdmin
                index={index}
                acmotors={order.name}
                orderNumber={order.orderNumber}
                dateTime={order.dateTime}
                service={order.service}
                mechanicid={order._id}
                firstname={order.name}
                // lastname={mechanic.name}
                phonenumber={order.abn}
                Aboutus={order.aboutus}
                email={order?.email}
                street={order.address.street}
                suburb={order.address.suburb}
                state={order.address.state}
                pincode={order.address.pinCode}
              />
            </div>
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
