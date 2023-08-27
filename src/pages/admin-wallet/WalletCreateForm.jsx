
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { TYPE } from '../../data';

import adminApi from '../../api/adminApi'

export default function WalletCreateForm({ open, setOpen, updateUserList }) {

  const { enqueueSnackbar } = useSnackbar();
  const [validationError, setValidationError] = useState({
    position: '',
    content: ''
  })

  const isError = (name) => {
    return validationError.position === name
  }

  const [formData, setFormData] = useState({
    ownerRoleId: 1,
    address: '',
    networkId: '',
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
    console.log(formData)
    const response = await adminApi.createAdminWallet(formData)

    if(response.status) {
      enqueueSnackbar('Wallet was created successfull', { variant: 'success' });
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
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle textAlign={'center'}>Add New Wallet</DialogTitle>
        <DialogContent>
          <TextField
            label="Address"
            name="address"
            error={!!(isError('address'))}
            helperText={isError('address') && validationError.content}
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Network</InputLabel>
            <Select
              label="Network"
              name="networkId"
              id="demo-simple-select-standard"
              value={formData.networkId}
              onChange={handleChange}
            >
              {
                TYPE.NETWORK_TYPES.map((type) => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name} - {type.symbol}
                    </MenuItem>
                  )
                })
              }
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
