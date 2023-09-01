import Web3 from 'web3';
import axios from 'axios';

import SMART_CONTRACT from '../smartcontracts';
import { approveToken } from './tokenContract';
import tuitionApi from '../api/tuitionApi';
import adminApi from '../api/adminApi';

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
        const finalTransaction = [...data_].reverse();
        await setTransactions(finalTransaction)
        
    } catch (error) {
        console.error(error);
    }
}

const waitForTransactionConfirmation = async (txHash) => {
  try {
    const checkConfirmation = async () => {
      try {
        const response = await axios.get(`https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=HRHN4TN2BPF6SDCPWVHXAKYCU9XSKZDYUH`);
        const status = response.data?.status;

        console.log("status", status, response)

        if (status === '1') {
            console.log('Transaction confirmed');
        } else if (status === '0') {
            console.log('Transaction failed');
          throw new Error('Transaction failed');
        } else {
            console.log('Transaction pending');
            await wait(3000); // Wait for 2 seconds before checking the status again
            await checkConfirmation(); // Recursively call the function to continue checking
        }
      } catch (error) {
            console.error(error);
      }
    };

    await checkConfirmation();
  } catch (error) {
    console.error(error);
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const despoitTuition = async (amount, tuitionCode, studentCode, onComplete, data) => {

    console.log("data", data)

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

                await waitForTransactionConfirmation(txHash);

                const result =  await tuitionApi.confirmPaymentTuition(
                    {
                        studentId : studentCode,
                        paidAmount : data.TotalInVND,
                        rate : data.rate,
                        USDTAmount : amount,
                        tuitionId : tuitionCode,
                        tx : txHash,
                        semesterName : data.semesterName
                    }
                )

                if(result.status === 200){
                    await onComplete()
                }
            }
            catch (error){
                console.error(error);
            }
        }
        
    } catch (error) {
        console.error(error);
    }
}

export const activeReceiverAddress  = async ( address, data, onComplete ) => {
    try {
        const web3 = new Web3(window.ethereum);

        const contract = await TDTUContract();

        console.log("address", address)

        const data_ = await contract.methods.changeReceiver(
            address
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

        console.log("activeReceiverAddress", txHash)

        const isDeleted = await adminApi.activeAdminWallet(data)

        await onComplete(isDeleted)
    }
    catch (error) {
        console.log(error)
    }
}