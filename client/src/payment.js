const web3 = require('web3')

function mainEnter() {
    web3.eth.getAccounts(function(error, result) {
    web3.eth.sendTransaction(
        {from:"0xC63de0aA5d8d23998C4D6108F612FE7B03C910a5",
        to:web3.eth.accounts[0],
        value:  "11000000000000000000", 
            }, function(err, transactionHash) {
      if (!err)
        console.log(transactionHash + " success"); 
    });
});
