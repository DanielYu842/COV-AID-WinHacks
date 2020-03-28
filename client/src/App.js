import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import 'rsuite/dist/styles/rsuite-default.css';
import { Sidenav , Nav, Icon, Dropdown} from 'rsuite';
import Paper from '@material-ui/core/Paper';

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
      id : false
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
                    <Dropdown eventKey="3" title="Status" icon={<Icon icon="task" />}>
                      <Dropdown.Item eventKey="3-1" icon={<Icon icon={this.state.id ? "check" : "close"}></Icon>}>Government ID</Dropdown.Item>
                      <Dropdown.Item eventKey="3-1" icon={<Icon icon={this.state.health ? "check" : "close"}></Icon>}>Health</Dropdown.Item>
                      <Dropdown.Item eventKey="3-1" icon={<Icon icon={this.state.employment ? "check" : "close"}></Icon>}>Employment</Dropdown.Item>
                    </Dropdown>
                    <Link to="/information" style={{textDecoration : "none"}}>
                      <Nav.Item eventKey="2" icon={<Icon icon="book2" />}>
                        Information
                      </Nav.Item>
                    </Link>

                  </Nav>
                </Sidenav.Body>
              </Sidenav>

          </div>
          <div className="content-div">
              <Switch>
                <Route exact path="/information">
                  <Information></Information>
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard></Dashboard>
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
