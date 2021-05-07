import React, {Component} from 'react'
import {Form, Button, Input, Message} from "semantic-ui-react";
import {withRouter} from 'next/router'
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
	state = {
		minimumContribution: '',
		errorMessage: '',
		loading: false
	}
	
	onSubmit = async e => {
		e.preventDefault()
		
		this.setState({loading: true, errorMessage: ''})
		
		try {
			const accounts = await web3.eth.getAccounts()
			await factory.methods
				.createCampaign(this.state.minimumContribution)
				.send({from: accounts[0]})
			this.props.router.push('/')
		} catch (e) {
			this.setState({errorMessage: e.message })
		}
		
		this.setState({ loading: false })
	}
	
	render() {
		return <Layout>
			<h3>Create a campaign!</h3>
			
			<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						label="wei"
						labelPosition="right"
						value={this.state.minimumContribution}
						onChange={e => this.setState({minimumContribution: e.target.value })}
					/>
				</Form.Field>
				
				<Message error header="Oop!" content={this.state.errorMessage} />
				<Button primary loading={this.state.loading}>Create!</Button>
			</Form>
		</Layout>
	}
}

export default withRouter(CampaignNew)