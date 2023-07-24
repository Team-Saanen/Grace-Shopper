import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser, selectUser } from "../store/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);

  return (
    <>
      <h1>User Information</h1>
      <div key={user.id}>
        <div>
          <h2>Username: {user.userName}</h2>
          <img
            src={user.imgUrl}
            alt={user.userName}
            style={{ width: "100px", height: "100px" }}
          />
          <h3>
            Name: {user.firstName} {user.lastName}
          </h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
    </>
  );
};

export default User;
