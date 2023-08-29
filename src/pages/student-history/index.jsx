import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { Card, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import Label from '../../components/label';

import { getTransactionAll } from '../../interactions/tuitionContract';

const tableConfig = [
    {
        head : 'Wallet Address',
        decs : '0x699...',
    },
    {
        head : 'Amount',
        decs : 'USDT',
    },
    {
        head : 'Tuition Code',
        decs : '()',
    },
    {
        head : 'Time',
        decs : '()',
    },
    {
        head : 'Student Code',
        decs : '()',
    },
    {
        head : 'Status',
        decs : '()',
    },
]

const style = {
    headStyle: 
    {
        color: '#0067AC', 
        fontWeight: 'bold',
    },
    decsStyle: {
        fontStyle: 'italic',
    },
    valueStyle: 
    {
        color: '#0267AC', 
        fontWeight: 'bold',
    },
}

export default function StudentHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactionAll(setTransactions);
    }, [])

    return (
        <Card>
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableConfig.map((row, index) => {
                                        return (
                                            <TableCell
                                                key={index}
                                                align={'center'}
                                                style={style.headStyle}
                                            >
                                                { row.head }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                {
                                    tableConfig.map((row, index) => {
                                        return (
                                            <TableCell
                                                key={index}
                                                align={'center'}
                                                style={style.decsStyle}
                                            >
                                                { row.decs }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        {
                            ( transactions.length > 0 )
                            ?
                            (
                                <TableBody>
                                    {
                                        transactions?.map((tx, index) => {
                                            const date = new Date(Number.parseInt(`${tx?.timestamp.toString()}000`, 10)).toLocaleString('en-GB', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                            })
                                            return (
                                                <TableRow key={index} hover role="checkbox">
                                                    <TableCell align="center" style={style.valueStyle}>
                                                            { tx?.student}
                                                    </TableCell>

                                                    <TableCell align="center" style={style.valueStyle}>
                                                            { Web3.utils.fromWei(tx?.amount, 'ether')}
                                                    </TableCell>

                                                    <TableCell align="center" style={style.valueStyle}>
                                                            { tx?.tuitionCode}
                                                    </TableCell>

                                                    <TableCell align="center" style={style.valueStyle}>
                                                            { date }
                                                    </TableCell>
                                                    <TableCell align="center" style={style.valueStyle}>
                                                            { tx?.studentCode}
                                                    </TableCell>
                                                    <TableCell align="center" style={style.valueStyle}>
                                                        <Label color={ 'success'}>
                                                            Complete
                                                        </Label>
                                                    </TableCell>
                                                </TableRow>

                                            )
                                        }) 
                                    }
                                </TableBody>
                            )
                            :
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
                                                    No results found for this semester.
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
        </Card>
    )
}
