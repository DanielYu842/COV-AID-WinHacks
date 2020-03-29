import Web3 from 'web3';

// get account: web3.eth.getAccounts();
const web3 = new Web3(window.web3.currentProvider);
export default web3;