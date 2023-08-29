import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import adminApi from '../../../api/adminApi';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState('');

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log(formData)
    const res = await adminApi.login(formData)
    
    if(res.status){
      enqueueSnackbar('You are logged in successfully', { variant: 'success' });
      localStorage.setItem('user', JSON.stringify({
        ...res.data
      }));
      navigate('/dashboard')
    }
  };

  return (
    <>
      <Stack spacing={3} mb={3}>
        <TextField 
          name="username" 
          label="Username" 
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => handleLogin()}>
        Login
      </LoadingButton>
    </>
  );
}
