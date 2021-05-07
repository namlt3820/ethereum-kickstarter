import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../../../../components/Layout'
import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: '',
    }

    static async getInitialProps(ctx) {
        const { campaign } = ctx.query
        return { campaign }
    }

    onSubmit = async (e) => {
        const { value, description, recipient } = this.state
        const { campaign: address, router } = this.props
        e.preventDefault()
        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts()
            const campaign = Campaign(address)
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipient
                )
                .send({
                    from: accounts[0],
                })
            router.push(`/campaigns/${address}/requests`)
        } catch (e) {
            this.setState({ errorMessage: e.message })
        }

        this.setState({ loading: false })
    }

    render() {
        const {
            value,
            description,
            recipient,
            errorMessage,
            loading,
        } = this.state
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={description}
                            onChange={(e) =>
                                this.setState({ description: e.target.value })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={value}
                            onChange={(e) =>
                                this.setState({ value: e.target.value })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={recipient}
                            onChange={(e) =>
                                this.setState({ recipient: e.target.value })
                            }
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={errorMessage} />
                    <Button primary loading={loading}>
                        Create!
                    </Button>
                </Form>
            </Layout>
        )
    }
}

export default withRouter(RequestNew)
