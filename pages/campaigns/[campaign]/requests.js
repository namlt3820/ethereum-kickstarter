import Layout from '../../../components/Layout'
import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Link from 'next/link'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class Requests extends Component {
    static async getInitialProps(ctx) {
        const { campaign: address } = ctx.query
        const campaign = Campaign(address)
        const requestsCount = await campaign.methods.getRequestsCount().call()
        const approversCount = await campaign.methods.approversCount().call()

        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) =>
                    campaign.methods.requests(index).call()
                )
        )
        return { address, requests, requestsCount, approversCount }
    }

    renderRows = () => {
        const { address, requests, approversCount } = this.props
        return requests.map((request, index) => (
            <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
            />
        ))
    }

    render() {
        const { Header, HeaderCell, Row, Body } = Table
        const { address, requestsCount } = this.props

        return (
            <Layout>
                <h3>Request</h3>
                <Link href={`/campaigns/${address}/requests/new`}>
                    <a>
                        <Button
                            primary
                            floated={'right'}
                            style={{ marginBottom: 10 }}
                        >
                            Add Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {requestsCount} requests.</div>
            </Layout>
        )
    }
}

export default Requests
