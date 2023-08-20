import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';

import adminApi from '../../api/adminApi'
import Iconify from '../../components/iconify';

import TableUserList from './TableUserList';
import UserEditForm from './UserEditForm';
import UserCreateForm from './UserCreateForm';

export default function UserPage() {

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const getUserList = async () => {
      const getUserList = await adminApi.getUserManagerList()
      await setFilteredUsers(getUserList.data.data)
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
            User Manager
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenCreateForm(true)}>
            Add User
          </Button>
        </Stack>

        <TableUserList 
          filteredUsers={filteredUsers}
          getUserList={getUserList}
        />

        <UserEditForm 
          open={openEditForm} 
          setOpen={setOpenEditForm} 
        />

        <UserCreateForm
          open={openCreateForm} 
          setOpen={setOpenCreateForm} 
          updateUserList={getUserList}
        />

      </Container>
    </>
  );
}
