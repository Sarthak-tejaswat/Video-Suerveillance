import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const userState = useSelector((state) => state.user);
  console.log(userState);
  if (!userState) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = userState;

  return (
    <div>
      {firstName} {lastName}
    </div>
  );
};

export default UserInfo;
