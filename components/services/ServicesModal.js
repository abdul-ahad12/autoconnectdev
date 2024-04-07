import React, { useState } from "react";
import CusButton from "../section/button";

const ServicesModal = ({
  isOpen,
  onClose,
  onSubmit,
  showSubmitButton = true,
  fields = [],
  formheading,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 ">
      <div className="bg-white rounded-lg p-10 relative">
        <button
          className="absolute right-2 top-0 p-2 text-black"
          onClick={onClose}
        >
          X
        </button>
        <div className="font-bold text-lg my-5 text-secondary ">
          {formheading}
        </div>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-8">
          {fields.map((field, index) => (
            <label key={index} className="block mb-4">
              {`${field.label}:`}
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="border border-gray-400 p-2 w-full rounded-md"
              />
            </label>
          ))}
          <br />
          {showSubmitButton && (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
            // <CusButton text={"Submit"} type={"primary"} />
          )}
        </form>
      </div>
    </div>
  );
};

export default ServicesModal;
