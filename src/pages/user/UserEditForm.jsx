import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import adminApi from '../../api/adminApi'

export default function UserEditForm({ open, setOpen, updateUserList, data }) {

  const { enqueueSnackbar } = useSnackbar();
  const [validationError, setValidationError] = useState({
    position: '',
    content: ''
  })

  const isError = (name) => {
    return validationError.position === name
  }

  const [formData, setFormData] = useState({...data.find(user => user.id === open.id)});

  const handleClose = () => {
    setOpen({
      state: false,
      id: ''
    });
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await adminApi.editUser({ownerRoleId: 1, ...formData})

    if(response.status) {
      enqueueSnackbar('User was edited successfull', { variant: 'success' });
      updateUserList()
      handleClose();
    }else{

      setValidationError({
        position: response.position,
        content: response.msg
      })
    }
  };
  
  useEffect(() => {
    const currentData = {...data.find(user => user.id === open.id)}
    setFormData({
      fullName: currentData.fullName,
      email: currentData.email,
      username: currentData.username,
      roleId: currentData.role_id
    })
    console.log("formData", formData)
  }, [open])

  return (
    <>
      <Dialog open={open.state} onClose={handleClose}>
        <DialogTitle textAlign={'center'}>Edit user information</DialogTitle>
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

          <FormControl sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              label="Role"
              name="roleId"
              id="demo-simple-select-standard"
              defaultValue={formData.roleId}
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
