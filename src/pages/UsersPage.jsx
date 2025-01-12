import React, { useState } from 'react';
import { Users, UserPlus, Search, Moon, Sun } from 'lucide-react';
import UserManagement from '../components/UserManagement';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, idx) => idx !== index);
    setUsers(newUsers);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-violet-100'
    }`}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className={`h-8 w-8 ${
                isDarkMode ? 'text-violet-400' : 'text-violet-600'
              }`} />
              <h1 className={`ml-3 text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                User Management
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:gap-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {users.length}
              </p>
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Pending Users</h3>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>

          {/* User Management Section */}
          <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Manage Users
                </h2>
                <button
                  onClick={() => {/* Add new user logic */}}
                  className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors duration-200"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Add New User
                </button>
              </div>
              
              <div className="relative">
                <UserManagement 
                  users={users.filter(user => 
                    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                  )}
                  addUser={addUser}
                  deleteUser={deleteUser}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;