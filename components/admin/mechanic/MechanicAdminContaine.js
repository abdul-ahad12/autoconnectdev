import React from "react";
import MechanicDashboard from "../../../pages/mechanic/mechanicDashboard";

const MechanicAdminContainer = () => {
  // Array of mechanics data
  const mechanicsData = [
    { acmotors: "AC Motor 1", dateofsignup: "2023-01-01", numberoforders: 5 },
    { acmotors: "AC Motor 2", dateofsignup: "2023-02-01", numberoforders: 8 },
    { acmotors: "AC Motor 3", dateofsignup: "2023-03-01", numberoforders: 3 },
    { acmotors: "AC Motor 4", dateofsignup: "2023-04-01", numberoforders: 6 },
    { acmotors: "AC Motor 5", dateofsignup: "2023-05-01", numberoforders: 7 },
    { acmotors: "AC Motor 6", dateofsignup: "2023-06-01", numberoforders: 9 },
    // Add more mechanics data as needed
  ];

  const itemsPerPage = 6;
  const startIndex = 0;
  const endIndex = Math.min(itemsPerPage, mechanicsData.length);

  // Slice mechanicsData array based on start and end index
  const currentMechanics = mechanicsData.slice(startIndex, endIndex);

  return (
    <div>
      {currentMechanics.map((mechanic, index) => (
        <MechanicDashboard
          key={index}
          acmotors={mechanic.acmotors}
          dateofsignup={mechanic.dateofsignup}
          numberoforders={mechanic.numberoforders}
        />
      ))}
    </div>
  );
};

export default MechanicAdminContainer;
