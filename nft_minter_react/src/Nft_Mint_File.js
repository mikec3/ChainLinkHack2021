import {useState} from 'react'
import {useMoralis, useMoralisFile} from 'react-moralis';

const Nft_Mint_File = (props) => {

	const {saveFile} = useMoralisFile();

  	const [fileToLoad, setFileToLoad] = useState(null);

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
	  const encodedFunction = props.web3.eth.abi.encodeFunctionCall({
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
	    to: props.nft_contract_address,
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
	
	return (
		<div>
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
		</div>
	)
}

export default Nft_Mint_File;