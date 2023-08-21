import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import adminApi from '../../api/adminApi';

export default function ConfirmDelete({ open, id, setOpen, setOpenPopOver, updateUserList }) {
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const isDeleted = await adminApi.deleteAdminWallet(1, id)

        if(isDeleted.status){
            enqueueSnackbar('Wallet address was delered successfull', { variant: 'success' });
        }

        // Close the popup
        setOpen(false);
        setOpenPopOver(false);
        updateUserList()
    };

    return (
       <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="error">
                Delete Wallet
            </DialogTitle>

            <DialogContent>
                <p>Are you sure you want to delete this wallet?</p>
                <p>This action cannot be undone.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                
                <Button onClick={handleConfirm} variant="outlined" color="error">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

       </>
    );
}
