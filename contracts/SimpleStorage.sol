pragma solidity 0.5.16;
//pragma solidity >=0.4.21 <0.7.0; this is the defualt

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  address payable[] recipients;
  function sendEther(address payable recipient) external {
    recipient.transfer(11 ether);
    //we need to do the algo for amount
  }
}
