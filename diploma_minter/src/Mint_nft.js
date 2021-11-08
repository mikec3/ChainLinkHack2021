import React, {useState} from 'react'
import {ethers} from 'ethers'
import nft_cert_1_abi from './Contracts/nft_cert_1_abi.json'

const Mint_nft = (props) => {

	// local testing ganache address: 0xA81f7D9CB07241B7905FBaB27c9FA11fF0b2FcFB
	// testnet Ropsten address:
	// production mainnet address:  
	const contractAddress = '0xA81f7D9CB07241B7905FBaB27c9FA11fF0b2FcFB';

	// instantiate the contract
	const contract = new ethers.Contract(contractAddress, nft_cert_1_abi, props.signer);
	console.log(contract);

	const mint_handler = (event) => {
		// prevent default page re-load
		event.preventDefault();

		// address to send to
		let graduateAddress = event.target.sendToAddress.value;

		// tokenURI
		let tokenURI = event.target.tokenURI.value;

		// mint with contract
		contract.mintNFT(graduateAddress, tokenURI)
		.then(result => { 
			console.log(result)
			result.wait()
			.then(receipt => {
				console.log(receipt);
			})
		});
	}
	
	return (
		<div>
			<h4> Send Diploma to Graduate! </h4>
			<form onSubmit={mint_handler}>
				<p> Graduate's Address </p>
				<input id='sendToAddress' type='text'/>
				<p> IPFS CDI of diploma </p>
				<input id='tokenURI' type='text'/>
				<button type={"submit"}> Mint Diploma </button>
			</form>

		</div>
	)
}

export default Mint_nft