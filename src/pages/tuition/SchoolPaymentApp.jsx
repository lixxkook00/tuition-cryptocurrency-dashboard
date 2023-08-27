import React, { useState, useEffect } from 'react';

import Web3 from 'web3';
import { Button } from '@mui/material';
import { approveToken } from '../../interactions/tokenContract';
import { despoitTuition, getTransactionAll } from '../../interactions/tuitionContract';
import { getVNDRate } from '../../utils/changeRate';

const SMART_CONTRACT = {
    ABI : [{"inputs":[{"internalType":"address","name":"_receiverAddress","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"student","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"tuitionCode","type":"string"},{"indexed":false,"internalType":"string","name":"studentCode","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"TuitionPaid","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newReceiver","type":"address"}],"name":"changeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_tuitionCode","type":"string"},{"internalType":"string","name":"_studentCode","type":"string"}],"name":"depositTuition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTransactionHistory","outputs":[{"components":[{"internalType":"address","name":"student","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"tuitionCode","type":"string"},{"internalType":"string","name":"studentCode","type":"string"}],"internalType":"struct SchoolPaymentSystem.Transaction[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiverAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"showBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"studentBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"address","name":"student","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"tuitionCode","type":"string"},{"internalType":"string","name":"studentCode","type":"string"}],"stateMutability":"view","type":"function"}],
    ADDRESS : '0xdFADABcaaE05aB24e4e311184535e32Db221f08b',
}

export default function SchoolPaymentApp () {
    const [web3, setWeb3] = useState(new Web3(window.ethereum));
    const [transactions, setTransactions] = useState([]);

    // get transaction
    useEffect(() => {
        getTransactionAll(setTransactions)
        console.log(transactions)
    }, []);

    // desposit
    const handleDespositTuition = async () => {
        const rate = await getVNDRate(13800000);
        console.log('rate', rate)
        await despoitTuition(rate.finalTuition, 'test123', '51800423')
    }

    return (
        <div>
            <Button onClick={() => handleDespositTuition()} variant='containedw' >
                Test handle Approval
            </Button>
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {transactions?.map((tx, index) => (
                        <li key={index}>
                            Student: {tx.student}, Amount: {web3?.utils.fromWei(tx.amount, 'ether')} USDT,
                            Tuition Code: {tx.tuitionCode}, Student Code: {tx.studentCode}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};