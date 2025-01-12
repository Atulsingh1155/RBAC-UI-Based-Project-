import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserManagement = ({ users, addUser, deleteUser }) => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddUser = () => {
    addUser(newUser);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add User</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => deleteUser(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
