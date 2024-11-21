import React, { useState } from 'react';
import { 
  ShieldIcon, 
  PlusIcon, 
  EditIcon, 
  Trash2Icon, 
  CheckIcon, 
  XIcon 
} from 'lucide-react';

const PermissionsPage = () => {
  // State for Permissions
  const [permissions, setPermissions] = useState([
    {
      id: '1',
      name: 'User Management',
      description: 'Manage system users',
      module: 'Users',
      canRead: true,
      canWrite: true,
      canDelete: false
    },
    {
      id: '2',
      name: 'Role Configuration',
      description: 'Configure system roles',
      module: 'Roles',
      canRead: true,
      canWrite: true,
      canDelete: false
    },
    {
      id: '3',
      name: 'Reporting Access',
      description: 'View and generate reports',
      module: 'Reports',
      canRead: true,
      canWrite: false,
      canDelete: false
    }
  ]);

  // State for new/edit permission dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);

  // Handler for adding/editing permissions
  const handleSavePermission = () => {
    if (currentPermission) {
      if (currentPermission.id) {
        // Edit existing permission
        setPermissions(permissions.map(p => 
          p.id === currentPermission.id ? currentPermission : p
        ));
      } else {
        // Add new permission
        setPermissions([
          ...permissions, 
          { ...currentPermission, id: `${permissions.length + 1}` }
        ]);
      }
      setIsDialogOpen(false);
      setCurrentPermission(null);
    }
  };

  // Handler for deleting permissions
  const handleDeletePermission = (id) => {
    setPermissions(permissions.filter(p => p.id !== id));
  };

  // Render Permission Dialog
  const renderPermissionDialog = () => (
    isDialogOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl w-[500px] max-w-full border border-gray-700 transform transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">
              {currentPermission?.id ? 'Edit Permission' : 'Create New Permission'}
            </h2>
            <button 
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-300">Permission Name</label>
              <input 
                className="w-full bg-gray-700 border-2 border-gray-600 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={currentPermission?.name || ''}
                onChange={(e) => setCurrentPermission(prev => ({ 
                  ...prev, 
                  name: e.target.value 
                }))}
                placeholder="Enter permission name"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-gray-300">Description</label>
              <input 
                className="w-full bg-gray-700 border-2 border-gray-600 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={currentPermission?.description || ''}
                onChange={(e) => setCurrentPermission(prev => ({ 
                  ...prev, 
                  description: e.target.value 
                }))}
                placeholder="Enter description"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-gray-300">Module</label>
              <input 
                className="w-full bg-gray-700 border-2 border-gray-600 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={currentPermission?.module || ''}
                onChange={(e) => setCurrentPermission(prev => ({ 
                  ...prev, 
                  module: e.target.value 
                }))}
                placeholder="Enter module name"
              />
            </div>
            
            <div className="flex space-x-4">
              {['canRead', 'canWrite', 'canDelete'].map(perm => (
                <label key={perm} className="flex items-center text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={currentPermission?.[perm] || false}
                    onChange={(e) => setCurrentPermission(prev => ({ 
                      ...prev, 
                      [perm]: e.target.checked 
                    }))}
                    className="mr-2 text-blue-500 focus:ring-blue-500 rounded"
                  />
                  {perm.replace('can', '')}
                </label>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform hover:scale-105"
                onClick={handleSavePermission}
              >
                Save Permission
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
        <div className="flex flex-row items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <ShieldIcon className="mr-3 text-blue-500" /> Permissions Management
          </h1>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            onClick={() => {
              setCurrentPermission({
                id: '',
                name: '',
                description: '',
                module: '',
                canRead: false,
                canWrite: false,
                canDelete: false
              });
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon className="mr-2" /> Add Permission
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-700">
                  <th className="p-3 text-left text-gray-300">Name</th>
                  <th className="p-3 text-left text-gray-300">Description</th>
                  <th className="p-3 text-left text-gray-300">Module</th>
                  <th className="p-3 text-center text-gray-300">Read</th>
                  <th className="p-3 text-center text-gray-300">Write</th>
                  <th className="p-3 text-center text-gray-300">Delete</th>
                  <th className="p-3 text-right text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr 
                    key={permission.id} 
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 hover:scale-105"
                  >
                    <td className="p-3 font-medium text-gray-100">{permission.name}</td>
                    <td className="p-3 text-gray-400">{permission.description}</td>
                    <td className="p-3 text-gray-400">{permission.module}</td>
                    {['canRead', 'canWrite', 'canDelete'].map(perm => (
                      <td key={perm} className="p-3 text-center">
                        {permission[perm] ? (
                          <CheckIcon className="text-green-500 mx-auto" />
                        ) : (
                          <XIcon className="text-red-500 mx-auto" />
                        )}
                      </td>
                    ))}
                    <td className="p-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            setCurrentPermission(permission);
                            setIsDialogOpen(true);
                          }}
                        >
                          <EditIcon size={16} className="mr-2" /> Edit
                        </button>
                        <button 
                          className="flex items-center px-3 py-1 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeletePermission(permission.id)}
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

      {renderPermissionDialog()}
    </div>
  );
};

export default PermissionsPage;