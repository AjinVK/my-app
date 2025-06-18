import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./SignUp";
import TableForm from "./TableForm";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();

  const editingUser: User | null = location.state?.user || null;

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
  };

  const deleteUser = (email: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
  };

  return (
    <Routes>
      <Route
        path="signup"
        element={
          <SignUp
            onSubmitUser={addUser}
            onUpdateUser={updateUser}
            editingUser={editingUser}
            registeredUsers={users}
          />
        }
      />
      <Route
        path="usertable"
        element={<TableForm users={users} onDeleteUser={deleteUser} />}
      />
    </Routes>
  );
};

export default UserManagement;
