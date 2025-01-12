import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Changed BrowserRouter to HashRouter for GitHub Pages
import { useTheme, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import PermissionsPage from './pages/PermissionsPage';

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className={`${isMobile ? 'ml-0' : 'ml-72'} flex-1 p-4 transition-all duration-300`}>
            <Routes>
              <Route path="/RBAC-UI-Based-Project-" element={<Dashboard />} />
              <Route path="/RBAC-UI-Based-Project-/users" element={<UsersPage />} />
              <Route path="/RBAC-UI-Based-Project-/roles" element={<RolesPage />} />
              <Route path="/RBAC-UI-Based-Project-/permissions" element={<PermissionsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
