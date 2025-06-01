import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import TableForm from "./TableForm";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<
    Array<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >([]);

  const addUser = (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <Routes>
      <Route path="signup" element={<SignUp onSubmitUser={addUser} />} />
      <Route path="usertable" element={<TableForm users={users} />} />
    </Routes>
  );
};

export default UserManagement;
