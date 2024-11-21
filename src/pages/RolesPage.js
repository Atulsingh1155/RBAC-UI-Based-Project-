import React, { useState } from 'react';
import { 
  UsersIcon, 
  PlusIcon, 
  EditIcon, 
  Trash2Icon, 
  ShieldIcon,
  UserCheckIcon
} from 'lucide-react';

const RolesPage = () => {
  // Initial roles data (unchanged)
  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['User Management', 'Role Configuration', 'Reporting Access'],
      users: 3
    },
    {
      id: '2', 
      name: 'Manager',
      description: 'Restricted system access',
      permissions: ['User Management', 'Reporting Access'],
      users: 5
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['Reporting Access'],
      users: 12
    }
  ]);

  // State for dialog management (unchanged)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  // Available permissions (unchanged)
  const availablePermissions = [
    'User Management', 
    'Role Configuration', 
    'Reporting Access', 
    'Dashboard Access',
    'Analytics View',
    'Settings Management'
  ];

  // Handlers (unchanged)
  const handleSaveRole = () => {
    if (currentRole) {
      if (currentRole.id) {
        setRoles(roles.map(r => 
          r.id === currentRole.id ? currentRole : r
        ));
      } else {
        setRoles([
          ...roles, 
          { 
            ...currentRole, 
            id: `${roles.length + 1}`,
            users: 0 
          }
        ]);
      }
      setIsDialogOpen(false);
      setCurrentRole(null);
    }
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  // Render Role Dialog
  const renderRoleDialog = () => (
    isDialogOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl w-[500px] max-w-full border border-gray-700 transform transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">
              {currentRole?.id ? 'Edit Role' : 'Create New Role'}
            </h2>
            <button 
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <ShieldIcon size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Role Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Role Name</label>
              <input 
                className="w-full bg-gray-700 border-2 border-gray-600 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={currentRole?.name || ''}
                onChange={(e) => setCurrentRole(prev => ({ 
                  ...prev, 
                  name: e.target.value 
                }))}
                placeholder="Enter role name"
              />
            </div>
            
            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Description</label>
              <textarea 
                className="w-full bg-gray-700 border-2 border-gray-600 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={currentRole?.description || ''}
                onChange={(e) => setCurrentRole(prev => ({ 
                  ...prev, 
                  description: e.target.value 
                }))}
                placeholder="Enter role description"
                rows={3}
              />
            </div>
            
            {/* Permissions Selection */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Permissions</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-800 p-4 rounded-lg">
                {availablePermissions.map(perm => (
                  <label key={perm} className="flex items-center text-gray-200 hover:bg-gray-700 p-1 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      checked={(currentRole?.permissions || []).includes(perm)}
                      onChange={(e) => {
                        const currentPermissions = currentRole?.permissions || [];
                        setCurrentRole(prev => ({
                          ...prev,
                          permissions: e.target.checked 
                            ? [...currentPermissions, perm]
                            : currentPermissions.filter(p => p !== perm)
                        }));
                      }}
                      className="mr-2 text-blue-500 focus:ring-blue-500 rounded"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform hover:scale-105"
                onClick={handleSaveRole}
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <div className="bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex flex-row items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <UsersIcon className="mr-3 text-blue-500" size={28} /> Roles Management
          </h1>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            onClick={() => {
              setCurrentRole({
                id: '',
                name: '',
                description: '',
                permissions: [],
                users: 0
              });
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon className="mr-2" /> Add Role
          </button>
        </div>
        
        {/* Roles Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-700">
                  <th className="p-3 text-left text-gray-300">Name</th>
                  <th className="p-3 text-left text-gray-300">Description</th>
                  <th className="p-3 text-center text-gray-300">Permissions</th>
                  <th className="p-3 text-center text-gray-300">Users</th>
                  <th className="p-3 text-right text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr 
                    key={role.id} 
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 hover:scale-105"
                  >
                    <td className="p-3 font-medium text-gray-100">{role.name}</td>
                    <td className="p-3 text-gray-400">{role.description}</td>
                    <td className="p-3 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {role.permissions.map(perm => (
                          <span 
                            key={perm} 
                            className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-600 transition-colors"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-center flex items-center justify-center">
                      <UserCheckIcon className="mr-2 text-blue-500" />
                      <span className="text-gray-200">{role.users}</span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            setCurrentRole(role);
                            setIsDialogOpen(true);
                          }}
                        >
                          <EditIcon size={16} className="mr-2" /> Edit
                        </button>
                        <button 
                          className="flex items-center px-3 py-1 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2Icon size={16} className="mr-2" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {renderRoleDialog()}
    </div>
  );
};

export default RolesPage;