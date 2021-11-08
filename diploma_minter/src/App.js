import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import {ethers} from 'ethers'
import ConnectWallet from './ConnectWallet'
import Mint_nft from './Mint_nft'
function App() {

  const [signer, setSigner] = useState(null);


// https://docs.ethers.io/v5/api/signer/
// signer passed up from Connectwallet component. Signer can perform read/write on behalf of the user's connected wallet
const connectWalletHandler = async (walletSigner) => {
  console.log('Wallet successfuly connected');

  // show the address of the signer
  console.log(await walletSigner.getAddress());

  // proves this is a valid signer
  console.log(ethers.Signer.isSigner(walletSigner));

  // set the signer for use in app
  setSigner(walletSigner);
}

  return (
    <div className="App">
      <ConnectWallet onConnectWallet={connectWalletHandler}/>

      {/* && operator below means that if signer is not null, display the <Mint_nft/> component */}
      {signer && <Mint_nft signer={signer}/> }
    </div>
  );
}

export default App;
