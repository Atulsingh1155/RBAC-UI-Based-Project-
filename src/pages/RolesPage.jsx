import React, { useState } from 'react';
import { 
  UsersIcon, 
  PlusIcon, 
  EditIcon, 
  Trash2Icon, 
  ShieldIcon,
  UserCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

const RolesPage = () => {
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [expandedRole, setExpandedRole] = useState(null);

  const availablePermissions = [
    'User Management', 
    'Role Configuration', 
    'Reporting Access', 
    'Dashboard Access',
    'Analytics View',
    'Settings Management'
  ];

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

  const RoleCard = ({ role }) => {
    const isExpanded = expandedRole === role.id;

    return (
      <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShieldIcon className="text-blue-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-gray-100">{role.name}</h3>
          </div>
          <button
            onClick={() => setExpandedRole(isExpanded ? null : role.id)}
            className="text-gray-400 p-1"
          >
            {isExpanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-gray-400">{role.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map(perm => (
                  <span key={perm} 
                    className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <UserCheckIcon size={16} className="mr-1" />
              <span>{role.users} Users</span>
            </div>
            <div className="flex space-x-2 pt-2">
              <button 
                className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setCurrentRole(role);
                  setIsDialogOpen(true);
                }}
              >
                <EditIcon size={16} className="mr-2" /> 
                Edit
              </button>
              <button 
                className="flex-1 flex items-center justify-center px-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteRole(role.id)}
              >
                <Trash2Icon size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRoleDialog = () => (
    isDialogOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-[500px] border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
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
            
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Permissions</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-gray-800 p-4 rounded-lg">
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
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <button 
                className="w-full sm:w-auto px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform hover:scale-105"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <UsersIcon className="mr-3 text-blue-500" size={28} /> 
            Roles Management
          </h1>
          <button 
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
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
            <PlusIcon className="mr-2" size={20} /> Add Role
          </button>
        </div>

        {/* Mobile View: Cards */}
        <div className="block sm:hidden">
          {roles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-700">
                  <th className="p-4 text-left text-gray-300">Name</th>
                  <th className="p-4 text-left text-gray-300">Description</th>
                  <th className="p-4 text-center text-gray-300">Permissions</th>
                  <th className="p-4 text-center text-gray-300">Users</th>
                  <th className="p-4 text-right text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="p-4 font-medium text-gray-100">{role.name}</td>
                    <td className="p-4 text-gray-400">{role.description}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {role.permissions.map(perm => (
                          <span key={perm} 
                            className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-600 transition-colors">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <UserCheckIcon className="mr-2 text-blue-500" size={16} />
                        <span className="text-gray-200">{role.users}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            setCurrentRole(role);
                            setIsDialogOpen(true);
                          }}
                        >
                          <EditIcon size={16} className="mr-2" /> 
                          Edit
                        </button>
                        <button 
                          className="flex items-center px-3 py-1 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2Icon size={16} className="mr-2" />
                          Delete
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