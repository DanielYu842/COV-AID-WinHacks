const web3 = require('web3')


web3.eth.sendTransaction({
    from: "0xC63de0aA5d8d23998C4D6108F612FE7B03C910a5",
    to: web3.eth.accounts[0], 
    value: web3.toWei(1, "ether"), 
}, function(err, transactionHash) {
    if (err) { 
        console.log(err); 
    } else {
        console.log(transactionHash);
    }
});