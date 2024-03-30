import React, { useEffect, useState } from "react";
import MechanicsDashbord from "./MechanicsDashbord";

const MechanicsACOrders = () => {
  // Array of mechanics data (assuming it's available)
  // const mechanicsData = [
  //   { acmotors: "AC Motor 1", dateofsignup: "2023-01-01", numberoforders: 5 },
  //   { acmotors: "AC Motor 2", dateofsignup: "2023-02-01", numberoforders: 8 },
  //   { acmotors: "AC Motor 3", dateofsignup: "2023-03-01", numberoforders: 3 },
  //   { acmotors: "AC Motor 4", dateofsignup: "2023-04-01", numberoforders: 6 },
  //   { acmotors: "AC Motor 5", dateofsignup: "2023-05-01", numberoforders: 7 },
  //   { acmotors: "AC Motor 6", dateofsignup: "2023-06-01", numberoforders: 9 },
  //   { acmotors: "AC Motor 3", dateofsignup: "2023-03-01", numberoforders: 3 },
  //   { acmotors: "AC Motor 4", dateofsignup: "2023-04-01", numberoforders: 6 },
  //   { acmotors: "AC Motor 5", dateofsignup: "2023-05-01", numberoforders: 7 },
  //   { acmotors: "AC Motor 6", dateofsignup: "2023-06-01", numberoforders: 9 },
  //   // Add more mechanics data as needed
  // ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [approvedMechanics, setApprovedMechanics] = useState([]);
  console.log(approvedMechanics);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchApprovedMechanics() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/getAllApprovedMechanics?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch approved mechanics");
        }
        const data = await response.json();
        setApprovedMechanics(data.approvedMechanics);
        setTotalCount(data.totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching approved mechanics:", error);
      }
    }

    fetchApprovedMechanics();
  }, [currentPage]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(approvedMechanics.length / itemsPerPage);

  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    approvedMechanics.length
  );

  // Slice mechanicsData array based on start and end index
  const currentMechanics = approvedMechanics.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="base:hidden lg:grid grid-cols-4 mb-5 gap-x-28  items-center border-[1px] py-3 px-6 rounded-lg ">
        <div className="col-span-1">
          <h3 className="text-graycolor2  font-semibold">Mechanics Name</h3>
        </div>
        <div className="col-span-1">
          <h3 className="text-primary font-semibold">Date of Sign Up</h3>
        </div>
        <div className="col-span-1">
          <h3 className="text-primary font-semibold">Number of Orders</h3>
        </div>
        <div className="col-span-1">
          <h3 className="text-primary font-semibold">Info</h3>
        </div>
      </div>
      {currentMechanics.map((mechanic, index) => (
        <MechanicsDashbord
          key={index}
          acmotors={mechanic.name}
          dateofsignup={mechanic.createdAt}
          numberoforders={mechanic.numberoforders}
          firstname={mechanic.name}
          lastname={mechanic.name}
          phonenumber={mechanic.abn}
          Aboutus={mechanic.aboutus}
          email={mechanic?.email}
          street={mechanic.address.street}
          suburb={mechanic.address.suburb}
          state={mechanic.address.state}
          pincode={mechanic.address.pinCode}
        />
      ))}
      {/* Pagination controls */}
      <div className="flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MechanicsACOrders;
