import Web3 from "web3";

let web3;
const isInBrowserAndMetaMaskRunning = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

if (isInBrowserAndMetaMaskRunning) {
	web3 = new Web3(window.ethereum)
} else {
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/4f4a25567a7741308e9fbbc75b5df2fe'
	)
	web3 = new Web3(provider)
}

export default web3