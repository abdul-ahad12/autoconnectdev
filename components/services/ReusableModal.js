import React from "react";

const Modal = ({ isOpen, onClose, fields = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 ">
      <div className="bg-white rounded-lg p-10 relative">
        <button
          className="absolute right-2 top-2 p-2 text-black"
          onClick={onClose}
        >
          X
        </button>
        <div className="grid lg:grid-cols-2 gap-x-8">
          {fields.map((field, index) => (
            <label key={index} className="block mb-4">
              {`${field?.label}:`}
              <input
                type="text"
                name={field?.name}
                value={field?.value || ""}
                className="border border-gray-400 p-2 w-full rounded-md"
                disabled // Render input as disabled
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
