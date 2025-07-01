import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginForm/Login';
import { UserManagement } from './pages/UserManagement';
import { ForgotPassword } from './pages/ForgotPassword';
import { SnackbarProvider } from './context/SnackBarContext';

const App: React.FC = () => {
  return (
    <Router>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<UserManagement />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
};

export default App;