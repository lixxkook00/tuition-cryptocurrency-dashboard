import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';

import adminApi from '../../api/adminApi'
import Iconify from '../../components/iconify';

import TableWalletList from './TableWalletList';
import UserEditForm from './UserEditForm';
import WalletCreateForm from './WalletCreateForm';

export default function AdminWallet() {

  const [openEditForm, setOpenEditForm] = useState({
    state: false,
    id: ''
  });
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const [filteredWallets, setFilteredWallets] = useState([]);
  const getUserList = async () => {
      const getUserList = await adminApi.getAdminWalletList()
      await setFilteredWallets(getUserList.data.data)
  }

  useEffect(() => {
      getUserList()
  }, [])


  return (
    <>
      <Helmet>
        <title> User | TDTU Tuition </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admin Wallets
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenCreateForm(true)}>
            Add New Wallet
          </Button>
        </Stack>

        <TableWalletList 
          filteredUsers={filteredWallets}
          getUserList={getUserList}
          setOpenEditForm={setOpenEditForm}
        />

        <UserEditForm 
          open={openEditForm} 
          setOpen={setOpenEditForm} 
          data={filteredWallets}
          updateUserList={getUserList}
        />

        <WalletCreateForm
          open={openCreateForm} 
          setOpen={setOpenCreateForm} 
          updateUserList={getUserList}
        />

      </Container>
    </>
  );
}
