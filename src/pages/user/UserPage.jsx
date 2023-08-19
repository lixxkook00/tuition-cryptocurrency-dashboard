import { Helmet } from 'react-helmet-async';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';

import TableUserList from './TableUserList';

export default function UserPage() {

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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add User
          </Button>
        </Stack>

        <TableUserList />

      </Container>
    </>
  );
}
