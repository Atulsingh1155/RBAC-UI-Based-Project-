import React from 'react';
import { Button, TextField } from '@mui/material';

const RoleManagement = ({ roles, addRole }) => {
  const [roleName, setRoleName] = React.useState('');

  const handleAddRole = () => {
    addRole({ name: roleName });
    setRoleName('');
  };

  return (
    <div>
      <TextField
        label="Role Name"
        fullWidth
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
      <Button onClick={handleAddRole} variant="contained" color="primary" sx={{ mt: 2 }}>Add Role</Button>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
