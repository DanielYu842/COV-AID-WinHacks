import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import 'rsuite/dist/styles/rsuite-default.css';
import { Sidenav , Nav, Icon, Dropdown} from 'rsuite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Button} from '@material-ui/core/';
import logo from './covaid.png';
import Profile from './Pages/Profile.js'
import Transactions from './Pages/Transactions'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Dashboard from "./Pages/Dashboard"
import Information from "./Pages/Information"

import "./App.css";
import "./test.scss"
class App extends Component {
  constructor(){
    super()
    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null ,
      employment : true,
      health : false,
      id : false,
      counter : 0,
      green : true
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);






      // //Government ID Validation Route
      // const input = null
      // const response = await fetch("http://localhost:XXXX/ID", {
      //   method : "POST",
      //   headers : {
      //     "Content-Type" : "application/json"
      //   },
      //   body : JSON.stringify(input)        
      // })
      // const data = await response.json()

      // this.setState({    
      //     employment : data.employment,
      //     health : data.health,
      //     id : data.id
      // })






    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };
  async testing(){
    
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // const web3 = await getWeb3();
      // const accounts = await web3.eth.getAccounts();
    
      // // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );
      // var receiver = "0xC63de0aA5d8d23998C4D6108F612FE7B03C910a5";  
      // var sender = web3.eth.accounts[0];
      // web3.eth.getAccounts(function(error, accounts) {
      //   if(error) {
      //     console.log(error);
      //   }
        
      //   web3.eth.getBalance(accounts[0]).then(function(result){
      //    console.log( "Balance : " ,web3.utils.fromWei(result, 'ether'));
      //   });
      //  });



  //const web3 = require(web3);
  const web3 = await getWeb3();

  const abi =[
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
  
  var contractAbi = web3.eth.contract(abi);
  var myContract = contractAbi.at(contractAddress);

  
  // suppose you want to call a function named myFunction of myContract
  // myContract.sendEther(web3.eth.accounts[0])
  // And that is where all the magic happens
  // web3.eth.sendTransaction({
  //     to:web3.eth.accounts[0],//contracts address
  //     from:contractAddress,
  //     data: get,
  //     value: web3.toWei(EtherAmount, 'ether')//EtherAmount=>how much ether you want to move
  // },function (error, result){ 
  //             if(!error){
  //                 console.log(result);//transaction successful
  //             } else{
  //                 console.log(error);//transaction failed
  //             }
  //     });
}



  changeColour(){
  this.setState((prevState) => {
    return({counter : prevState.counter + 1})
  })
  if (this.state.counter == 2){
    this.setState({green : false})
  }
  console.log(this.state.counter)
  console.log(this.state.green)
  }


  render() {
    if (!this.state.web3) {
      return (
        <div className="landing-page">
          <div className="landing-text">
            <div className="text-anim">Please</div> 
            <div className="text-anim"> 
              <span>login with Metamask</span>
            </div>
          </div>
          {/*
          <div className="curve-div">         
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="shadow">
              <path fill="#bfc7ff" fillOpacity="1" d="M0,64L34.3,53.3C68.6,43,137,21,206,42.7C274.3,64,343,128,411,133.3C480,139,549,85,617,90.7C685.7,96,754,160,823,154.7C891.4,149,960,75,1029,64C1097.1,53,1166,107,1234,117.3C1302.9,128,1371,96,1406,80L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                </path>
            </svg>
          </div>*/}
          <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
 
        </div>
      )
    }

    return (
      <div className="App">
        <Router>          
          <div className="sideNav-div">
            <div className="logo-div">
              <img src={logo} alt="Smiley face" height="100" width="100"/>
              <div className="title-div">COV-AID</div>
            </div>
              <Sidenav
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
              className="sideNav"
              >
                <Sidenav.Body>
                  <Nav>
                    <Link to="/dashboard" style={{textDecoration : "none"}}>
                      <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                        Dashboard
                      </Nav.Item>
                    </Link>
                    <Link to="/profile" style={{textDecoration : "none"}}>
                      <Nav.Item eventKey="1" icon={<Icon icon="user" />}>
                        Profile
                      </Nav.Item>
                    </Link>
                    <Link to="/transactions" style={{textDecoration : "none"}}>
                      <Nav.Item eventKey="1" icon={<Icon icon="history" />}>
                        Transactions
                      </Nav.Item>
                    </Link>
                    <Link to="/information" style={{textDecoration : "none"}}>
                      <Nav.Item eventKey="2" icon={<Icon icon="book2" />}>
                        Information
                      </Nav.Item>
                    </Link>
                    <Dropdown eventKey="3" title="Status" icon={<Icon icon="task" />} onClick={() => this.changeColour()}>
                      <Dropdown.Item eventKey="3-1" >{this.state.green ? null : <img src="https://img.icons8.com/cotton/64/000000/checkmark.png" height="27" style={{marginRight: "10px"}}/>} Government ID</Dropdown.Item>
                      <Dropdown.Item eventKey="3-1" >{this.state.green ? null : <img src="https://img.icons8.com/cotton/64/000000/checkmark.png" height="27" style={{marginRight: "10px"}}/>} Health</Dropdown.Item>
                      <Dropdown.Item eventKey="3-1" > {this.state.green ? null : <img src="https://img.icons8.com/cotton/64/000000/checkmark.png" height="27" style={{marginRight: "10px"}}/>} Employment</Dropdown.Item>
                    </Dropdown>

                  </Nav>
                </Sidenav.Body>
              </Sidenav>
              <div className="button-valid-div">
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    className="upload-button"
                    onClick={() => this.testing()}
                    >
                      <div className="receievePayment">Receive Payment</div>
                </Button>
              </div>

          </div>
          <div className="content-div">
              <div className="logout">
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  className="logout-button"     
                  backgroundColor="red"             
                  >
                    <div className="receievePayment">Logout</div>
                </Button>
              </div>
              <Switch>
                <Route exact path="/information">
                  <Information></Information>
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard></Dashboard>
                </Route>
                <Route exact path="/profile">
                  <Profile></Profile>
                </Route>
                <Route exact path="/transactions">
                  <Transactions></Transactions>
                </Route>
                <Route exact path="/">
                  <Dashboard></Dashboard>
                </Route>
              </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
