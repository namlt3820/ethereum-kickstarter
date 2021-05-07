import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'

class RequestRow extends Component {
    onApprove = async () => {
        const { address, id } = this.props
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(address)
        await campaign.methods.approveRequest(id).send({
            from: accounts[0],
        })
    }

    onFinalize = async () => {
        const { address, id } = this.props
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(address)
        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0],
        })
    }

    render() {
        const { Row, Cell } = Table
        const {
            approversCount,
            request: { description, value, recipient, approvalCount, complete },
            id,
        } = this.props
        const readyToFinalize = approvalCount > approversCount / 2

        return (
            <Row disabled={complete} positive={readyToFinalize && !complete}>
                <Cell>{id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{`${approvalCount}/${approversCount}`}</Cell>
                <Cell>
                    {!complete && (
                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {!complete && (
                        <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        )
    }
}

export default RequestRow
