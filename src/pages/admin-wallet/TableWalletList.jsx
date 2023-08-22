import React, { useEffect, useState } from 'react'

import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import { fTimeTZ } from '../../utils/formatTime';
import { TYPE } from '../../data';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import ConfirmDelete from './ConfirmDelete';
import ConfirmActive from './ConfirmActive';


const TABLE_HEAD = [
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'network_type_id', label: 'Network', alignRight: false },
  { id: 'created_at', label: 'Create At', alignRight: false },
  { id: 'updated_at', label: 'Update At', alignRight: false },
  { id: 'is_active', label: 'Active', alignRight: false },
  { id: '' },
];

export default function TableWalletList({ filteredUsers, getUserList, setOpenEditForm }) {

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [selectedForDelete, setSelectedForDelete] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleOpenMenu = (event, id) => {
        setOpen(event.currentTarget);
        setSelectedForDelete(id)
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filteredUsers.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

    const isNotFound = !filteredUsers.length && !!filterName;

    // DELETE
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    const handleDeleteWallet = () => {
        setOpen(false)
        setOpenConfirmDelete(true)
    }

    
    // ACTIVE
    const [openActiveConfirm, setOpenActiveConfirm] = useState(false);
    
    const handleEditUser = () => {
        setOpen(false)
        setOpenActiveConfirm({
            state: true,
            id: selectedForDelete
        })
    }


    // Handle copy address to clipboard
    const [copiedStates, setCopiedStates] = useState({});

    const handleCopy = (address, index) => {
        navigator.clipboard.writeText(address);
        setCopiedStates((prevState) => ({ ...prevState, [index]: true }));

        setTimeout(() => {
        setCopiedStates((prevState) => ({ ...prevState, [index]: false }));
        }, 3000);
    };

    return (
        <>
            <Card>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={filteredUsers.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {
                                filteredUsers.map((row) => {

                                    const selectedUser = selected.indexOf(row.id) !== -1;

                                    return (
                                        <TableRow 
                                            sx={{ 
                                                background: row.is_active === 1 ? 'linear-gradient(135deg, rgba(222, 65, 46, 0.2) 0%, rgba(0, 103, 172, 0.2) 100%)' : '',

                                            }} 
                                            hover 
                                            key={row.id} 
                                            tabIndex={-1} 
                                            role="checkbox" 
                                            selected={selectedUser}
                                        >
                                            <TableCell align="right">
                                                <IconButton size="large" color={copiedStates[row.id] ? 'success' : 'inherit'} onClick={(e) => handleCopy(row.address, row.id)}>
                                                    <Iconify icon={copiedStates[row.id] ? 'ph:check-bold' : 'ph:copy-bold'} />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    {/* <Avatar alt={row.fullName} src={avatarUrl} /> */}
                                                    <Typography variant="subtitle2" noWrap>
                                                        {row.address}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="left">{TYPE.NETWORK_TYPES[row.network_type_id - 1].name}</TableCell>

                                            <TableCell align="left">{fTimeTZ(row.created_at)}</TableCell>

                                            <TableCell align="left">{fTimeTZ(row.updated_at)}</TableCell>

                                            <TableCell align="left">
                                                <Label color={(row.is_active === 1 && 'success') || 'error'}>
                                                    { row.is_active === 1 ? 'Active' : 'Inactive' }
                                                </Label>
                                            </TableCell>

                                            {
                                                row.is_active === 1
                                                ?
                                                    <TableCell align="right">
                                                        <IconButton size="large" color="inherit">
                                                            <Iconify icon={'wpf:security-checked'} />
                                                        </IconButton>
                                                    </TableCell>
                                                :
                                                    <TableCell align="right">
                                                        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row.id)}>
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                            }

                                        </TableRow>
                                    );
                                })
                            }

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                        {
                            isNotFound 
                            && 
                            (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                                >
                                                <Typography variant="h6" paragraph>
                                                    Not found
                                                </Typography>

                                                <Typography variant="body2">
                                                    No results found for &nbsp;
                                                    <strong>&quot;{filterName}&quot;</strong>.
                                                    <br /> Try checking for typos or using complete words.
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                sx: {
                    p: 1,
                    width: 140,
                    '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                    },
                },
                }}
            >
                <MenuItem onClick={handleEditUser}>
                    <Iconify icon={'ic:baseline-check'} sx={{ mr: 2 }}/>
                    Active Now
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteWallet}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            
            <ConfirmDelete 
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
                setOpenPopOver={setOpen}
                id={selectedForDelete}
                updateUserList={getUserList}
            />

            <ConfirmActive 
                open={openActiveConfirm}
                setOpen={setOpenActiveConfirm}
                setOpenPopOver={setOpen}
                idActived={selectedForDelete}
                updateUserList={getUserList}
            />
        </>
    )
}
