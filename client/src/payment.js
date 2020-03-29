const web3 = require(web3);

const abi = [
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "sendEther",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "setGoStraight",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const EtherAmount = 11;

var contractAddress = "0x6bE9c67E437F09BD584C188Bfd6a91890ED09fb9";

var contractAbi = eth.contract(abi);
var myContract = contractAbi.at(contractAddress);
// suppose you want to call a function named myFunction of myContract
var get = myContract.myFunction.get();//just parameters you pass to myFunction
// And that is where all the magic happens
web3.eth.sendTransaction({
    to:web3.eth.accounts[0],//contracts address
    from:contractAddress,
    data: getData,
    value: web3.toWei(EtherAmount, 'ether')//EtherAmount=>how much ether you want to move
},function (error, result){ 
            if(!error){
                console.log(result);//transaction successful
            } else{
                console.log(error);//transaction failed
            }
    });