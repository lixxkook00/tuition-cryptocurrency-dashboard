import { Card, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';


const tableConfig = [
    {
        head : 'Previous Pending Charges',
        decs : '(1)',
    },
    {
        head : 'Semester Tuition',
        decs : '(2)',
    },
    {
        head : 'Reduction',
        decs : '(3)',
    },
    {
        head : 'Total Tuition Unpaid',
        decs : '(4) = (1) + (2) - (3)',
    },
    {
        head : 'Total Tuition Paid',
        decs : '(5)',
    },
    {
        head : 'Remaining Unpaid Tuition',
        decs : '(6) = (4) - (5)',
    },
    {
        head : 'Note',
        decs : '(7)',
    },
    {
        head : '',
        decs : '',
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
        color: '#DE412E', 
        fontWeight: 'bold',
    },
}

export default function TuitionMainTable({ data, semesterID }) {

    console.log(data)

    const [tuitionData, setTuitionData] = useState('')

    useEffect(() => {
        setTuitionData(data.find(obj => obj.SemesterID === semesterID))

    }, [semesterID])

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
                            ( data !== null )
                            ?
                            (
                                <TableBody>
                                    <TableRow hover role="checkbox">
                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.PreviousPendingCharges?.toLocaleString('en-US') }
                                        </TableCell>

                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.SemesterTuition?.toLocaleString('en-US') }
                                        </TableCell>

                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.Reduction?.toLocaleString('en-US') }
                                        </TableCell>

                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.TotalTuitionUnpaid?.toLocaleString('en-US') }
                                        </TableCell>
                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.TotalTuitionPaid?.toLocaleString('en-US') }
                                        </TableCell>
                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.RemainingUnpaidTuition?.toLocaleString('en-US') }
                                        </TableCell>
                                        <TableCell align="center" style={style.valueStyle}>
                                                { tuitionData?.Note?.toLocaleString('en-US') }
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit" >
                                                <Iconify icon={'eva:more-vertical-fill'} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
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
