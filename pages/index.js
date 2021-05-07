import React, {Component} from 'react'
import {Button, Card} from "semantic-ui-react";
import Link from 'next/link'
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

class CampaignIndex extends Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call()
		return {campaigns}
	}
	
	renderCampaigns() {
		const items = this.props.campaigns.map(address => ({
			header: address,
			description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
			fluid: true
		}))
		
		return <Card.Group items={items}/>
	}
	
	render() {
		return <Layout>
			<h3>Open Campaigns</h3>
			<Link href="/campaigns/new">
				<a>
					<Button
						content="Create Campaign"
						icon="add circle"
						primary
						floated="right"
					/>
				</a>
			</Link>
			{this.renderCampaigns()}
		</Layout>
	}
}

export default CampaignIndex