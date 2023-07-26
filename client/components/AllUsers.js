import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import { fetchAllUsers } from "../store/usersSlice";

const AllUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  // maps over the User data and turn it into User components
  return (
    <>
      <h1>All Users</h1>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </>
  );
};

export default AllUsers;
