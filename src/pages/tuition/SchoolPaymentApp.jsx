import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Web3 from 'web3';
import { Button, Stack } from '@mui/material';
import { getVNDRate } from '../../utils/changeRate';

import ConfirmPayment from './ConfirmPayment'
import { activeLoading, removeLoading } from '../../actions';

export default function SchoolPaymentApp ({ data, semesterID, semesterTypes }) {
    const dispatch = useDispatch();

    const [web3, setWeb3] = useState(new Web3(window.ethereum));

    // CONFIRM
    const [openConfirm, setOpenConfirm] = useState(false);

    const [tuitionData, setTuitionData] = useState('')
    const [confirmData, setConfirmData] = useState('')

    useEffect(() => {
        setTuitionData(data?.find(obj => obj.SemesterID === semesterID))

        console.log(tuitionData)
    }, [semesterID])

    // get transaction
    // useEffect(() => {
    //     getTransactionAll(setTransactions)
    //     console.log(transactions)
    // }, []);

    // desposit
    const handleDespositTuition = async () => {
        dispatch(activeLoading())
        const rate = await getVNDRate(tuitionData?.TotalTuitionUnpaid);
        
        setConfirmData({
            ...rate, 
            TotalInVND: tuitionData?.TotalTuitionUnpaid,
            TuitionCode:  tuitionData?.TuitionID,
            StudentID:  tuitionData?.studentId
        })
        
        console.log('rate', {...rate, TotalInVND: tuitionData?.TotalTuitionUnpaid })
        // await despoitTuition(rate.finalTuition, 'test123', '51800423')

        await dispatch(removeLoading())
        await setOpenConfirm(true)
    }

    return (
        <div>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2}>
                {
                    ( tuitionData?.IsPaid === 0 )
                    &&
                    <Button onClick={() => handleDespositTuition()} variant='contained' mt={2}>
                    Pay Tuition Now
                    </Button>
                }
            </Stack>

            

            <ConfirmPayment 
                open={openConfirm}
                setOpen={setOpenConfirm}
                data={confirmData}
                semesterID={semesterID}
                semesterTypes={semesterTypes}
            />


            {/* <div>
                <h2>Transaction History</h2>
                <ul>
                    {transactions?.map((tx, index) => (
                        <li key={index}>
                            Student: {tx.student}, Amount: {web3?.utils.fromWei(tx.amount, 'ether')} USDT,
                            Tuition Code: {tx.tuitionCode}, Student Code: {tx.studentCode}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};