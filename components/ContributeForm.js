import React, { Component } from 'react'
import web3 from '../ethereum/web3'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { withRouter } from 'next/router'
import Campaign from '../ethereum/campaign'

class ContributeForm extends Component {
    state = {
        value: '',
        loading: false,
        errorMessage: '',
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const { address, router } = this.props
        const campaign = Campaign(address)

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether'),
            })
            router.push(`/campaigns/${address}`)
        } catch (e) {
            this.setState({
                errorMessage: e.message,
            })
        }

        this.setState({ loading: false, value: '' })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={(e) =>
                            this.setState({ value: e.target.value })
                        }
                    />
                </Form.Field>
                <Message
                    error
                    header="Oop!"
                    content={this.state.errorMessage}
                />
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default withRouter(ContributeForm)
