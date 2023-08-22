import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import adminApi from '../../api/adminApi';

export default function ConfirmActive({ open, idActived, setOpen, setOpenPopOver, updateUserList }) {
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const data = {
            ownerRoleId: 1, 
            id: idActived
        }
        const isDeleted = await adminApi.activeAdminWallet(data)

        if(isDeleted.status){
            enqueueSnackbar('Wallet address was actived successfull', { variant: 'success' });
        }

        // Close the popup
        setOpen(false);
        setOpenPopOver(false);
        updateUserList()
    };

    return (
       <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="primary">
                Actice Wallet
            </DialogTitle>

            <DialogContent>
                <p>Are you sure you want to active this wallet?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="text" color="primary">Cancel</Button>
                
                <Button onClick={handleConfirm} variant="contained" color="success">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

       </>
    );
}
