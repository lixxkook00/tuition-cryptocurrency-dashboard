import Web3 from 'web3';

import SMART_CONTRACT from '../smartcontracts';

export const approveToken = async (amount) => {
    try {
        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(SMART_CONTRACT.TOKEN.ABI, SMART_CONTRACT.TOKEN.ADDRESS);
        
        const data_ = await contract.methods.approve(
            SMART_CONTRACT.TDTU_TUITION.ADDRESS, 
            web3.utils.toWei(amount.toString(), 'ether')
        ).encodeABI();
        
        const transactionParameters = {
            to: SMART_CONTRACT.TOKEN.ADDRESS,
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
        return true;
    } catch (error) {
            console.error('An error occurred:', error);
        return null;
    }
}