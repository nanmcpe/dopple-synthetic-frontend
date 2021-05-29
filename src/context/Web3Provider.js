import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { ThaiLottery } from '../abi/ThaiLotteryABI';
import { Synthetic } from '../abi/SyntheticABI';
import { Dolly } from '../abi/DollyABI';
import { DoppleSyntheticToken } from '../abi/DoppleSyntheticTokenABI';
import { useAlert, positions } from "react-alert";

console.log('positions', positions.BOTTOM_RIGHT);

export const Web3Context = createContext();

const Web3Provider = props => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [currentNetworkID, setCurrentNetworkID] = useState(0);
  const [lotteryContract, setlotteryContract] = useState({});
  const [syntheticContract, setSyntheticContract] = useState({});
  const [dollyContract, setDollyContract] = useState({});
  const [tokenContract, setTokenContract] = useState({});
  const web3 = new Web3(Web3.givenProvider);
  const alert = useAlert();
  const checkWeb3Provider = async () => {
    if (window.ethereum) {
      // let web3 = new Web3(window.ethereum);
      // const web3 = new Web3(Web3.givenProvider);
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // get permission to access accounts
      const lotteryAddress = '0x3d566B9f2Ed4a25d4681F9e79e2B22D8b0Cb8Fd0';
      const mylotteryContract = new web3.eth.Contract(ThaiLottery, lotteryAddress);
      setlotteryContract(mylotteryContract);

      const syntheticAddress = '0xb30931543733D7b2AeABa2CA25E8886a24888B38';
      const mySyntheticContract = new web3.eth.Contract(Synthetic, syntheticAddress);
      setSyntheticContract(mySyntheticContract);
      const dollyAddress = '0x2a49FF95c52Abb5d0302Bd59877B7CF32134f4E8';
      const myDollyContract = new web3.eth.Contract(Dolly, dollyAddress);
      setDollyContract(myDollyContract);
      const tokenAddress = '0x89996f43332693396693D6aDC76094487E9FD26C';
      const myTokenContract = new web3.eth.Contract(DoppleSyntheticToken, tokenAddress);
      setTokenContract(myTokenContract);

      //Set to the currentAccount state whatever account the user is using at the moment he loads the page
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      //Set to networkdId the ID of the network the user has in use in Metamask
      let currentNetworkID = await web3.eth.net.getId();
      setCurrentNetworkID(currentNetworkID);

      //Detect metamask account change
      window.ethereum.on('accountsChanged', function (accounts) {
        //console.log('accountsChanges',accounts[0]);
        setCurrentAccount(accounts[0]);
      });
      //Detect metamask network ID change
      window.ethereum.on('chainChanged', function (networkId) {
        // console.log('chainChanged',networkId);
        setCurrentNetworkID(networkId);
      });
    } else {
      console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
    }
  };

  // console.log('currentNetworkID', currentNetworkID);
  const showAlert = () => {
    if (currentNetworkID === 0) {
      alert.info('Loading...', { position: positions.BOTTOM_RIGHT });
    } else if (currentNetworkID === 42 || currentNetworkID === '0x2a') {
      alert.success("Great! You are connected to the Kovan Test Network", { position: positions.BOTTOM_RIGHT });
    } else if (currentNetworkID === 4 || currentNetworkID === '0x4') {
      alert.success("Great! You are connected to the Rinkeby Test Network", { position: positions.BOTTOM_RIGHT });
    } else {
      alert.error(
        "This application will only work in the Kovan or Rinkeby Test Network, please change the network to the Rinkeby Test Network", { position: positions.BOTTOM_RIGHT }
      );
    }
  };

  useEffect(() => {
    checkWeb3Provider();
  }, []);

  useEffect(() => {
    showAlert();
  }, [currentNetworkID]);

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        lotteryContract,
        syntheticContract,
        dollyContract,
        tokenContract,
        web3,
        alert,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
