import React from "react";

const MechanicsUser = () => {
  const user = {
    username: "john_doe",
    email: "john@example.com",
    role: "mechanic",
  };

  return (
    <div>
      <h1 className="lg:text-[min(1.5vw,32px)]">User Details</h1>
      <SingleUser
        username={user.username}
        email={user.email}
        role={user.role}
      />
    </div>
  );
};

export default MechanicsUser;

const SingleUser = ({ username, email, role }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between border-[1px] border-opacity-70 rounded-lg p-5">
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
