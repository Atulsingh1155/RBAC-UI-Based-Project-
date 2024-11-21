import React from 'react';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

const PermissionManagement = ({ permissions, updatePermission }) => {
  return (
    <div>
      <h3>Manage Permissions</h3>
      {permissions.map((permission, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={permission.enabled}
              onChange={() => updatePermission(index)}
              name={permission.name}
            />
          }
          label={permission.name}
        />
      ))}
    </div>
  );
};

export default PermissionManagement;
