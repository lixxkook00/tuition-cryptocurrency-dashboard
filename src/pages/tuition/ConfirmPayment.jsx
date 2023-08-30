import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { despoitTuition } from '../../interactions/tuitionContract';
import { activeLoading, removeLoading } from '../../actions';

export default function ConfirmPayment({ open, setOpen, data, semesterID, semesterTypes }) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        dispatch(activeLoading())

        await despoitTuition(
            data?.finalTuition, 
            data?.TuitionCode.toString(), 
            data?.StudentID.toString(),
            () => {
                setOpen(false)
                dispatch(removeLoading())
                enqueueSnackbar('School payment made successfully!!!', { variant: 'success' });
                navigate('/dashboard/student-history');
                enqueueSnackbar('Please check your student email for payment detail', { variant: 'success' });
            },
            {
                ...data,
                ...JSON.parse(localStorage.getItem('user')),
                semesterName: semesterTypes[semesterID-1].SemesterName
            }
        )
    }

    return (
       <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="primary">
                Confirm Payment
            </DialogTitle>

            <DialogContent>
                <p style={{textAlign: 'center'}}>
                    The tuition fee you have to pay is 
                    <span style={{ fontWeight: 'bold', color: '#2065D1'}}> 
                         { data?.TotalInVND?.toLocaleString('en-US') } VND
                    </span> 
                </p>

                <p style={{textAlign: 'center'}}>
                    With USDT exchange rate of 
                    <span style={{ fontWeight: 'bold', color: '#2065D1'}}> { data?.rate?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }</span>
                </p>

                <p style={{textAlign: 'center'}}>
                    The final balance required is 
                    <span style={{ fontWeight: 'bold', color: '#2065D1', fontSize: '26px'}}> { data?.finalTuition?.toLocaleString('en-US', { minimumFractionDigits: 10, maximumFractionDigits: 10 }) }</span>
                    <span style={{ fontWeight: 'bold', color: '#2065D1'}}> USDT</span>
                </p>

                <p style={{textAlign: 'center'}}>Are you sure you want to proceed?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='error'>Cancel</Button>
                
                <Button onClick={handleConfirm} variant="contained" color="success">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

       </>
    );
}
