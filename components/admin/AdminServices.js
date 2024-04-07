import React, { useEffect, useState } from "react";
import CusButton from "../section/button";
import axios from "axios";

const AdminServices = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [selectedServiceText, setSelectedServiceText] = useState("");
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [servicesArray, setServicesArray] = useState([]);
  console.log(servicesArray);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/services");
        console.log(response);
        setServicesArray(response.data.services);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (text, index) => {
    setSelectedServiceText(text);
    setSelectedServiceIndex(index);
    setIsEditModalOpen(true);
  };

  const handleAddServiceClick = () => {
    setSelectedServiceText("");
    setIsNewServiceModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsNewServiceModalOpen(false);
  };

  const handleSaveService = (updatedText, index) => {
    const updatedServices = [...servicesArray];
    updatedServices[index].name = updatedText;
    setServicesArray(updatedServices);
    handleCloseModal();
  };

  const handleAddService = (newServiceName) => {
    const newService = {
      id: servicesArray.length + 1,
      name: newServiceName,
    };
    setServicesArray([...servicesArray, newService]);
    handleCloseModal();
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...servicesArray];
    updatedServices.splice(index, 1);
    setServicesArray(updatedServices);
  };
  const handleUpdate = async () => {
    try {
      // Extract names from servicesArray
      const namesArray = servicesArray.map((service) => service.name);

      // Send only the array of names
      await axios.post("/api/services", namesArray);
      console.log("Services updated successfully");
    } catch (error) {
      console.error("Error updating services:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex items-end justify-end bg-graycolor p-4">
        <CusButton text={"+ New Service"} onClick={handleAddServiceClick} />
      </div>
      {servicesArray.length === 0 && (
        <div className="w-full flex justify-center ">No Service</div>
      )}
      {servicesArray.map((service, index) => (
        <SingleService
          key={index}
          text={service.name}
          onEditClick={() => handleEditClick(service.name, index)}
          onDeleteClick={() => handleDeleteService(index)}
        />
      ))}

      <CusButton onClick={handleUpdate} type={"primary"} text={"Update"} />
      {/* Edit Service Modal */}
      {isEditModalOpen && (
        <div className="fixed z-[100000000000] top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <ServicesModal
              initialText={selectedServiceText}
              onCancel={handleCloseModal}
              onSave={(updatedText) =>
                handleSaveService(updatedText, selectedServiceIndex)
              }
            />
          </div>
        </div>
      )}
      {/* New Service Modal */}
      {isNewServiceModalOpen && (
        <div className="fixed z-[100000000000] top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <NewServiceModal
              onCancel={handleCloseModal}
              onAdd={handleAddService}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;

const SingleService = ({ text, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex justify-between w-full border rounded-lg p-6">
      <p>{text}</p>
      <div className="flex gap-3">
        {/* Edit button */}
        <button onClick={onEditClick}>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.125 14.9688V18.875H4.03125L15.5521 7.35421L11.6458 3.44796L0.125 14.9688ZM18.5729 4.33337C18.9792 3.92712 18.9792 3.27087 18.5729 2.86462L16.1354 0.427124C15.7292 0.020874 15.0729 0.020874 14.6667 0.427124L12.7604 2.33337L16.6667 6.23962L18.5729 4.33337Z"
              fill="black"
            />
          </svg>
        </button>
        {/* Delete button */}
        <button onClick={onDeleteClick}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_834_4698)">
              <path
                d="M6.2487 19.7917C6.2487 20.9375 7.1862 21.875 8.33203 21.875H16.6654C17.8112 21.875 18.7487 20.9375 18.7487 19.7917V7.29167H6.2487V19.7917ZM8.33203 9.375H16.6654V19.7917H8.33203V9.375ZM16.1445 4.16667L15.1029 3.125H9.89453L8.85286 4.16667H5.20703V6.25H19.7904V4.16667H16.1445Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_834_4698">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>{" "}
      </div>
    </div>
  );
};

const ServicesModal = ({ initialText, onCancel, onSave }) => {
  const [text, setText] = useState(initialText);

  const handleCancel = () => {
    onCancel();
  };

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div className="flex flex-col gap-5 lg:min-w-[400px]">
      <p className="text-lg">
        Edit <span className="text-secondary">Service</span>
      </p>
      <input
        className="border border-gray-300 rounded-md p-2 mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-3 w-full items-end mt-4 justify-end">
        <CusButton text={"Save"} type={"primary"} onClick={handleSave} />
        <CusButton text={"Cancel"} type={"secondary"} onClick={handleCancel} />
      </div>
    </div>
  );
};

const NewServiceModal = ({ onCancel, onAdd }) => {
  const [text, setText] = useState("");

  const handleCancel = () => {
    onCancel();
  };

  const handleAdd = () => {
    onAdd(text);
  };

  return (
    <div className="flex flex-col gap-5 lg:min-w-[400px]">
      <p className="text-lg">
        Add <span className="text-secondary">New Service</span>
      </p>
      <input
        className="border border-gray-300 rounded-md p-2 mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-3 w-full items-end mt-4 justify-end">
        <CusButton text={"Add"} type={"primary"} onClick={handleAdd} />
        <CusButton text={"Cancel"} type={"secondary"} onClick={handleCancel} />
      </div>
    </div>
  );
};
