import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginForm/Login';
import UserManagement from './LoginForm/UserManagement';
import ForgotPassword from './LoginForm/ForgotPassword';
import './LoginForm/style.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<UserManagement />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>

  );
};

export default App;