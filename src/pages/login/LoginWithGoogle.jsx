import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, Stack } from '@mui/material'

import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';

import Iconify from '../../components/iconify';
import { handleLoginWithGoogle } from './action';


export default function LoginWithGoogle() {
    const navigate = useNavigate();

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    // LOGIN WITH GOOGLE
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            handleLoginWithGoogle(codeResponse, navigate)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={login}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
            </Button>
        </Stack>
    )
}
