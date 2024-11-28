// components/ActionModal.jsx

import React from "react";

const ActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  username,
}) => {
  if (!isOpen) return null;

  const actionText = actionType === "ban" ? "Ban" : "Unban";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">
          {actionText} User
        </h2>
        <p className="mb-6">
          Are you sure you want to {actionText.toLowerCase()}{" "}
          <span className="font-bold">{username}</span>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${
              actionType === "ban"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
