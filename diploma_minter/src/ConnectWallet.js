import React, {useState} from 'react'
import {ethers} from 'ethers'

const ConnectWallet = (props) => {

	// initialize wallet connector button's text
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connButtonPressed = () => {
		console.log('Requesting MetaMask Wallet Connection');

		// check to see if MetaMask is in the browser
		if (window.ethereum) {
			window.ethereum.request({method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');

				// instantiate ethers provider and signer
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const walletSigner = provider.getSigner();

				// deliver the connected address to app.js
				props.onConnectWallet(walletSigner);
			})

		} else {
			alert('Please install MetaMask browser extension to interact');
			return;
		}
	}
	
	return (
		<div>
		<button onClick={connButtonPressed}> {connButtonText} </button>
		</div>
	)
}

export default ConnectWallet;