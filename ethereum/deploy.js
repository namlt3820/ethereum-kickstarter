const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
	'fog apple project chat panther lucky jealous adapt sadness long shield rack',
	"https://rinkeby.infura.io/v3/4f4a25567a7741308e9fbbc75b5df2fe"
)

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()
	
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ gas: '1000000', from: accounts[0]})
	
	console.log({address: result.options.address})
}

deploy();