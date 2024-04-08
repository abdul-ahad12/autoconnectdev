import React, { useState } from "react";
import { formatDate } from "../../../lib/supportingFncs";
import Modal from "../../services/ReusableModal";

const MechanicsDashbord = ({
  acmotors,
  dateofsignup,
  numberoforders,
  firstname,
  lastname,
  phonenumber,
  email,
  Aboutus,
  street,
  suburb,
  state,
  pincode,
  link,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fields = [
    { name: "field1", label: "Name OF Company", value: firstname },
    // { name: "field2", label: "Last Name", value: lastname },
    // { name: "field2", label: "Phone Number", value: phonenumber },
    // { name: "field2", label: "Email", value: email },
    { name: "field2", label: "About Us", value: Aboutus },
    { name: "field2", label: "Street", value: street },
    { name: "field2", label: "Subrub", value: suburb },
    { name: "field2", label: "State", value: state },
    { name: "field2", label: "Pincode", value: pincode },
    { name: "field2", label: "Link", value: link },
  ];

  return (
    <div className=" grid base:grid-cols-2 lg:grid-cols-4 mb-3 base:gap-4 lg:gap-x-28 lg:gap-y-10 items-center border-[1px] base:p-4 lg:py-6 lg:px-10 rounded-lg">
      <button className="text-primary w-fit text-[1rem] rounded-md font-semibold">
        <span className="bg-graycolor text-graycolor2 text-[0.6rem] rounded-full p-2 border-2 font-medium mr-3">
          {acmotors}
        </span>
      </button>
      <div className="text-graycolor2 text-[min(3vw,19px)] lg:text-[min(0.8vw,14px)]  base:ml-10 lg:ml-0">
        {formatDate(dateofsignup)}
      </div>
      <div className="text-graycolor2  text-[min(4vw,19px)] lg:text-[min(0.8vw,14px)]">
        {suburb}
      </div>
      {/* <button className="text-primary w-fit text-[min(3vw,19px)]  lg:text-[0.8rem] border-2 rounded-md p-1 base:ml-10 lg:ml-0">
        Click here
      </button> */}
      <button
        className="text-primary w-fit text-[min(3vw,19px)]  lg:text-[0.8rem] border-2 rounded-md p-1 base:ml-10 lg:ml-0"
        onClick={handleOpenModal}
      >
        Click here
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} fields={fields} />
    </div>
  );
};

export default MechanicsDashbord;
