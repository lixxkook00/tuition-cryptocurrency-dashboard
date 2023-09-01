import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, Stack } from '@mui/material'

import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';

import Iconify from '../../components/iconify';
import { handleLoginWithGoogle } from './action';
import { activeLoading, removeLoading, setUserInfor } from '../../actions';


export default function LoginWithGoogle() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    // LOGIN WITH GOOGLE
    const handleLogin = () => {
        dispatch(activeLoading())
        login()
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            handleLoginWithGoogle(
                codeResponse, 
                navigate, 
                (data) => {
                    enqueueSnackbar('You are logged in successfully', { variant: 'success' });
                    dispatch(setUserInfor(data))
                    dispatch(removeLoading())
                },
                () => {
                    dispatch(removeLoading())
                    enqueueSnackbar('Please use your student email to log in to the system', { variant: 'error' });
                }
            )
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLogin}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
            </Button>
        </Stack>
    )
}
