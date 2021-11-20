import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {useMoralis} from 'react-moralis';
import DisplayOwnedNFTs from './DisplayOwnedNFTs';
import Nft_Mint_File from './Nft_Mint_File';
import Canvas from './Canvas';


function App() {


  const nft_contract_address = "0x966bd5c1bc7abd5e865968ae87e21492139c4fd8";

  const {enableWeb3, isWeb3Enabled, web3, authenticate, isAuthenticated, user, logout} = useMoralis();


  const enableAndAuthenticate = async () => {
    if(!isWeb3Enabled || !isAuthenticated) {
    await enableWeb3();
    await authenticate();
  } else {
    logout();
  }
  }

  let nftDisplay = <DisplayOwnedNFTs 
                    nft_contract_address = {nft_contract_address} 
                    userAddress = {window.ethereum.selectedAddress} 
                    chain = {'rinkeby'} />;

  let nftMintFromFile = <Nft_Mint_File
                        nft_contract_address = {nft_contract_address}
                        web3 = {web3}
                        />


  return (
    <div className="App">

    <button onClick={enableAndAuthenticate}>
      {(isAuthenticated && isWeb3Enabled) ? "Logout" : "Login"}
     </button>

     {nftMintFromFile}
     {(isAuthenticated && isWeb3Enabled) && nftDisplay}
     <Canvas/>
    </div>
  );
}

export default App;
