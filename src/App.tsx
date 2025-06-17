import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginForm/Login';
import UserManagement from './LoginForm/UserManagement';
import ForgotPassword from './LoginForm/ForgotPassword';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usermanagement/*" element={<UserManagement />} />
        <Route path="/usermanagement/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;