import Web3 from 'web3';

import SMART_CONTRACT from '../smartcontracts';
import { approveToken } from './tokenContract';

export const TDTUContract = async () => {
    try {
        const web3 = new Web3(window.ethereum);
    
        const contractInstance = new web3.eth.Contract(SMART_CONTRACT.TDTU_TUITION.ABI, SMART_CONTRACT.TDTU_TUITION.ADDRESS);
    
        return contractInstance
    }
    catch (error) {
        console.error('An error in create TDTUContract : ', error);
        return null
    }
}

export const getTransactionAll = async (setTransactions) => {
    try {

        const contract = await TDTUContract();
        const data_ = await contract?.methods.getTransactionHistory().call()

        await setTransactions(data_)
        
    } catch (error) {
        console.error(error);
    }
}

export const despoitTuition = async (amount, tuitionCode, studentCode) => {
    try {
        const web3 = new Web3(window.ethereum);

        if(approveToken(amount)){
            try{
                const contract = await TDTUContract();

                const data_ = await contract.methods.depositTuition(
                    web3.utils.toWei(amount.toString(), 'ether'), 
                    tuitionCode,
                    studentCode
                ).encodeABI();

                const transactionParameters = {
                    to: SMART_CONTRACT.TDTU_TUITION.ADDRESS,
                    from: window.ethereum.selectedAddress,
                    data: data_,
                    chainId: 97,
                };

                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
                    console.log('Hash of the transaction:', txHash);
                    console.log(true)
            }
            catch (error){
                console.error(error);
            }
        }
        
    } catch (error) {
        console.error(error);
    }
}