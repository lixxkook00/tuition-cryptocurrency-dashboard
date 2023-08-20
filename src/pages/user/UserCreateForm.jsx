import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import adminApi from '../../api/adminApi'

export default function UserCreateForm({ open, setOpen, updateUserList }) {

  const { enqueueSnackbar } = useSnackbar();
  const [validationError, setValidationError] = useState({
    position: '',
    content: ''
  })

  const isError = (name) => {
    return validationError.position === name
  }

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    rePassword: '',
    roleId: ''
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await adminApi.createUser(formData)

    if(response.status) {
      enqueueSnackbar('User was created successfull', { variant: 'success' });
      updateUserList()
      handleClose();
    }else{
      console.log("failed", response)

      setValidationError({
        position: response.position,
        content: response.msg
      })
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={'center'}>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            error={!!(isError('username'))}
            helperText={isError('username') && validationError.content}
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            error={!!(isError('email'))}
            helperText={isError('email') && validationError.content}
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Full Name"
            name="fullName"
            error={!!(isError('fullName'))}
            helperText={isError('fullName') && validationError.content}
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            error={!!(isError('password'))}
            helperText={isError('password') && validationError.content}
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Repeat Password"
            name="rePassword"
            error={!!(isError('rePassword'))}
            helperText={isError('rePassword') && validationError.content}
            type="password"
            value={formData.rePassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              label="Role"
              name="roleId"
              id="demo-simple-select-standard"
              value={formData.roleId}
              onChange={handleChange}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Teacher</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
};
