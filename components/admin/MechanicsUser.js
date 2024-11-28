// MechanicsUser.jsx

import React, { useEffect, useState } from "react";
import ActionModal from "../mechanic/ActionModal";

// SingleUser Component to display individual user details
const SingleUser = ({ user, onActionClick }) => {
  const { name, email, role, phoneNumber, createdAt, ban } = user;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 base:flex-col lg:flex-row justify-between border-[1px] border-opacity-70 rounded-lg p-5 mb-4">
        <div className="flex gap-1">
          <p>{name}</p>
        </div>
        <div className="flex gap-1">
          <p>{email}</p>
        </div>
        <div className="flex gap-3">
          <p className="bg-graycolor2 rounded-full p-1 text-[0.8rem] text-white">
            {role}
          </p>
        </div>
        <div className="flex gap-3 lg:ml-5">
          <p>{phoneNumber}</p>
        </div>
        <div className="flex gap-3 lg:ml-5">
          <p>{formattedDate}</p>
        </div>
        <div className="flex gap-3 lg:ml-5">
          {/* Action Button */}
          <button
            onClick={() => onActionClick(user)}
            className={`px-4 py-2 rounded ${
              ban
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {ban ? "Unban" : "Ban"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Pagination Component to handle page navigation
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number
              ? "bg-blue-700 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

// Main Component to display users with pagination and ban/unban functionality
const MechanicsUser = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // "ban" or "unban"

  // Define the number of users per page
  const USERS_PER_PAGE = 10;

  // Calculate total pages based on totalCount and USERS_PER_PAGE
  const totalPages = Math.ceil(totalCount / USERS_PER_PAGE);

  // Fetch users whenever currentPage changes
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/getAllUsers?page=${currentPage}&limit=${USERS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
        setTotalCount(data.totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [currentPage]);

  // Handler to change pages
  const handlePageChange = (pageNumber) => {
    // Ensure the page number is within valid range
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Handler for action button click
  const handleActionClick = (user) => {
    setSelectedUser(user);
    setActionType(user.ban ? "unban" : "ban");
    setIsModalOpen(true);
  };

  // Handler for confirming the action
  const handleConfirmAction = async () => {
    if (!selectedUser) return;

    const { _id, name, ban } = selectedUser;
    const endpoint = `/api/admin/users/${_id}/${ban ? "unban" : "ban"}`;
    const newBanStatus = !ban;

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Include authentication headers if necessary
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to perform action.");
      }

      const updatedUser = await response.json();

      // Update the users state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === _id ? { ...user, ban: newBanStatus } : user
        )
      );

      // Close the modal
      setIsModalOpen(false);

      // Optionally, show a success message
      alert(`User ${newBanStatus ? "banned" : "unbanned"} successfully.`);
    } catch (error) {
      console.error("Error performing action:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">User Details</h1>

      {/* Headers */}
      <div className="grid grid-cols-6 p-4 gap-x-8 bg-gray-100 rounded-lg">
        <div className="text-gray-600 font-medium">Username</div>
        <div className="text-gray-600 font-medium">Email</div>
        <div className="text-gray-600 font-medium">Role</div>
        <div className="text-gray-600 font-medium">Phone Number</div>
        <div className="text-gray-600 font-medium">Created At</div>
        <div className="text-gray-600 font-medium">Action</div>{" "}
        {/* New Column */}
      </div>

      {/* User List with Scroll */}
      <div className="mt-4 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <>
            {users.map((user) => (
              <SingleUser
                key={user._id} // Use unique identifier
                user={user}
                onActionClick={handleActionClick}
              />
            ))}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        actionType={actionType}
        username={selectedUser ? selectedUser.name : ""}
      />
    </div>
  );
};

export default MechanicsUser;
