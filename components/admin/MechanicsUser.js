import React, { useEffect, useState } from "react";

const MechanicsUser = () => {
  const user = {
    username: "john_doe",
    email: "john@example.com",
    role: "mechanic",
  };
  const [users, setUsers] = useState([]);
  console.log("USERS", users);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/getAllUsers?page=${currentPage}`
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
      }
    }

    fetchUsers();
  }, [currentPage]);

  return (
    <div>
      <h1 className="lg:text-[min(1.5vw,32px)]">User Details</h1>
      {users.map((data, idx) => {
        return (
          <div key={idx}>
            <SingleUser
              username={data.name}
              email={data.email}
              role={data.role}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MechanicsUser;

const SingleUser = ({ username, email, role }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 base:flex-col lg:flex-row justify-between border-[1px] border-opacity-70 rounded-lg p-5">
        <div className="flex gap-3">
          <div className="text-graycolor2">Username :</div>
          <p>{username}</p>
        </div>
        <div className="flex gap-3">
          <div className="text-graycolor2">Email :</div>
          <p>{email}</p>
        </div>
        <div className="flex gap-3">
          <div className="text-graycolor2">Role :</div>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};
