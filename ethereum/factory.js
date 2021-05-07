import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x97A18340105653E291BB04bF862bc91BC1985b1C'
)

export default instance