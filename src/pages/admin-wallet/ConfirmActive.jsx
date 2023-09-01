import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import adminApi from '../../api/adminApi';
import { activeReceiverAddress } from '../../interactions/tuitionContract';
import { activeLoading, removeLoading, setUserInfor } from '../../actions';

export default function ConfirmActive({ open, idActived, setOpen, setOpenPopOver, updateUserList, address }) {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const data = {
            ownerRoleId: 1, 
            id: idActived
        }

        if(window.ethereum.selectedAddress === '0xb937149b75c07d98192103e247026899177fcdc3'){
            dispatch(activeLoading())
            setOpen(false);
            setOpenPopOver(false);

            const bcRes = await activeReceiverAddress(
                address,
                data,
                (isDeleted) => {
                    console.log('done')
                    if(isDeleted.status){
                        enqueueSnackbar('Wallet address was actived successfull', { variant: 'success' });
                    }else{
                        enqueueSnackbar('Error : Something wrong.', { variant: 'error' });
                    }
                    updateUserList()
                    dispatch(removeLoading())
                }
            )

        }else {
            setOpen(false);
            setOpenPopOver(false);
            enqueueSnackbar('Only admin wallet can call this action', { variant: 'error' });
        }
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
