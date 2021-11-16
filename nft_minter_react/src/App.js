import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {useMoralis, useMoralisFile} from 'react-moralis';
import DisplayOwnedNFTs from './DisplayOwnedNFTs';


function App() {


const nft_contract_address = "0x966bd5c1bc7abd5e865968ae87e21492139c4fd8";

const {enableWeb3, isWeb3Enabled, web3, authenticate, isAuthenticated, user, logout} = useMoralis();

const {saveFile} = useMoralisFile();

const [fileToLoad, setFileToLoad] = useState(null);


const enableAndAuthenticate = async () => {
  if(!isWeb3Enabled || !isAuthenticated) {
  await enableWeb3();
  await authenticate();
} else {
  logout();
}
}

const formSubmissionHandler = async (event) => {
  event.preventDefault();
  console.log(event);
  console.log(event.target.nftFileImage.value);
  console.log(event.target.nftName.value);

  console.log(event.target.nftFileImage);

  console.log(fileToLoad);
 let savedFile = await saveFile(fileToLoad.name, fileToLoad, {saveIPFS:true});
 let savedFileIPFS = savedFile.ipfs();
 console.log(savedFileIPFS);

 const metaData = {
  "name": event.target.nftName.value,
  "description": event.target.nftDesc.value,
  "image": savedFileIPFS,
 }

 let metaDataJSON = JSON.stringify(metaData);

 const parts = [
  new Blob([metaDataJSON], {
    type: 'json'
  })
 ];

 const file = new File(parts, 'sample.json', {type:'json'});
 console.log(file);

 let savedMetaDataFile = await saveFile('metadata.json', file, {saveIPFS:true});
 //console.log(savedMetaDataFile.ipfs());

 let metaDataURI = savedMetaDataFile.ipfs();

 const txt = await mintNFT(event.target.recipient.value, metaDataURI).then(notify);
}

const mintNFT = async (_recipient, _uri) => {
  const encodedFunction = web3.eth.abi.encodeFunctionCall({
    name: "mintNFT",
    type: "function",
    inputs: [
      {
        type: 'address',
        name: 'recipient'
      },
      {
      type: 'string',
      name: 'tokenURI'
      }      
    ]
  }, [_recipient,_uri]);

    const transactionParameters = {
    to: nft_contract_address,
    from: window.ethereum.selectedAddress,
    data: encodedFunction
  };

  const txt = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters]
  });
  return txt
}

const notify = (_txt) => {
  console.log(_txt);
}

const updateFile = (file) => {
  setFileToLoad(file);
}

let nftDisplay = <DisplayOwnedNFTs nft_contract_address = {nft_contract_address} 
                    userAddress = {window.ethereum.selectedAddress} chain = {'rinkeby'} />;

  return (
    <div className="App">

    <button onClick={enableAndAuthenticate}>
      {isAuthenticated ? "Logout" : "Login"}
     </button>

     <form onSubmit={formSubmissionHandler}>
     <p> NFT Name </p>
     <input type='text' id='nftName'/>

     <p> NFT Desc </p>
     <input type='text' id='nftDesc'/>

     <p> File </p>
     <input type='file' id='nftFileImage' onChange={(e) => updateFile(e.target.files[0])}/>

     <p> Send To </p>
     <input type='text' id='recipient'/>
     <button type={'submit'}> Mint NFT </button>
     </form>

     {(isAuthenticated && isWeb3Enabled) && nftDisplay}
    </div>
  );
}

export default App;
