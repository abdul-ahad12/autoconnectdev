import React, { useEffect, useState } from "react";

const MechanicsUser = () => {
  const user = {
    username: "john_doe",
    email: "john@example.com",
    role: "mechanic",
  };
  const [users, setUsers] = useState([]);
  
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
  // 

  return (
    <div>
      <h1 className="lg:text-[min(1.5vw,32px)]">User Details</h1>
      <div className="grid grid-cols-5 p-4 gap-x-8">
        <div className="text-graycolor2">Username</div>
        <div className="text-graycolor2">Email</div>
        <div className="text-graycolor2">Role</div>
        <div className="text-graycolor2">Phone Number</div>
        <div className="text-graycolor2">Created At</div>
      </div>
      {users.map((data, idx) => {
        // let formatedDate = data.createdAt;
        // 
        let formatedDate = new Date(data.createdAt).toLocaleDateString("en-GB");
        

        return (
          <div key={idx} className="">
            <SingleUser
              username={data.name}
              email={data.email}
              role={data.role}
              number={data.phoneNumber}
              createdAt={formatedDate}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MechanicsUser;

const SingleUser = ({ username, email, role, number, createdAt }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5  base:flex-col lg:flex-row justify-between border-[1px] border-opacity-70 rounded-lg p-5">
        <div className="flex gap-1">
          {/* <div className="text-graycolor2">Username :</div> */}
          <p>{username}</p>
        </div>
        <div className="flex gap-1">
          {/* <div className="text-graycolor2">Email :</div> */}
          <p>{email}</p>
        </div>
        <div className="flex gap-3">
          {/* <div className="text-graycolor2">Role :</div> */}
          <p className="bg-graycolor2 rounded-full p-1 text-[0.8rem] text-white">
            {role}
          </p>
        </div>
        <div className="flex gap-3 lg:ml-5">
          {/* <div className="text-graycolor2">Phone Number :</div> */}
          <p>{number}</p>
        </div>
        <div className="flex gap-3 lg:ml-5">
          {/* <div className="text-graycolor2">Created At :</div> */}
          <p>{createdAt}</p>
        </div>
      </div>
    </div>
  );
};
