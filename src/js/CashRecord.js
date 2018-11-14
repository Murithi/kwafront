import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import {
	Message,
	Segment,
	Grid,
	Table,
	Icon,
	Form,
	Input,
	Label,
	Header,
	Divider,
	Dropdown,
	Button,
} from 'semantic-ui-react'
import InlineError from './messages/InlineError'
import moment from 'moment'

const GETACCOUNTS = gql`
	query getAccounts {
		accountFeed {
			id
			name
			balance {
				id
				balance
			}
		}
	}
`

var accountOptions = []
class CashRecord extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: {},
			loading: false,
		}
	}

	setAccountValue = (e, data) => {
		accountOptions.forEach(element => {
			if (element.value === data.value) {
				console.log(data.value)
				let result = this.props.accountFeed.accountFeed.find(obj => {
					return obj.name === data.value
				})
				console.log(result)
				this.setState({ accountChargedId: result.id })
				this.setState({ CashBalId: result.balance[0].id })
				this.setState({ balBefore: result.balance[0].balance })
				this.setState({ accountName: result.name })
			}
		})
	}

	validate = () => {
		const errors = {}
		if (!this.state.accountChargedId) errors.accountChargedId = "Can't be blank"
		if (!this.state.amountRecieved) errors.amountRecieved = "Can't be blank"

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._addBalance()
		}
		return errors
	}

	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		console.log(this.props.accountFeed)
		const { errors, loading } = this.state
		const loadingMessage = (
			<Message icon info>
				<Icon name="circle notched" loading />
				<Message.Content>
					<Message.Header>Just one second</Message.Header>
					We are fetching that content for you.
				</Message.Content>
			</Message>
		)

		const emptyMessage = (
			<Message icon info>
				<Icon name="warning circle" />
				<Message.Content>
					<Message.Header>No Accounts Found</Message.Header>
					<p>Make a new account to get started.</p>
					<Link to={'/cashaccount/new'} className="ui button primary">
						Add New Account{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.accountFeed.error}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)

		if (this.props.accountFeed && this.props.accountFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.accountFeed && this.props.accountFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.accountFeed.accountFeed === undefined ||
			this.props.accountFeed.accountFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		if (this.props.accountFeed.loading === false) {
			if (
				this.props.accountFeed.accountFeed !== undefined ||
				this.props.accountFeed.accountFeed.length !== 0
			) {
				let tempOp = [...new Set(this.props.accountFeed.accountFeed)]
				accountOptions = []
				tempOp.map(element => {
					return accountOptions.push({
						id: element.id,
						text: element.name,
						value: element.name,
					})
				})
			}
		}
		const { accountFeed } = this.props.accountFeed

		if (!accountFeed) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 900 }}>
					<Header as="h4" color="green" textAlign="center">
						Add Cash To Account
					</Header>
					<Form onSubmit={this.onSubmit} loading={loading}>
						<Segment.Group horizontal>
							<Segment>
								<Divider />
								<Table basic="very" celled>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<b> Choose Account </b>
											</Table.Cell>
											<Table.Cell>
												<Form.Field error={!!errors.accountChargedId}>
													<Dropdown
														value={this.state.accountName}
														placeholder="Select Account"
														fluid
														selection
														options={accountOptions}
														onChange={this.setAccountValue.bind(this)}
													/>
													{errors.accountChargedId && (
														<InlineError text={errors.accountChargedId} />
													)}
												</Form.Field>
											</Table.Cell>
										</Table.Row>

										<Table.Row>
											<Table.Cell>
												<b> Enter Amount </b>
											</Table.Cell>
											<Table.Cell>
												<Form.Field error={!!errors.amountRecieved}>
													<Input
														fluid
														labelPosition="right"
														type="number"
														onChange={e =>
															this.setState({ amountRecieved: e.target.value })
														}
														placeholder="Amount"
													>
														<Label basic>KES</Label>
														<input />
														<Label>.00</Label>
													</Input>
													{errors.amountRecieved && (
														<InlineError text={errors.amountRecieved} />
													)}
												</Form.Field>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>

								<Divider />

								<Button
									attached="bottom"
									positive
									onClick={() => this.onSubmit()}
								>
									Submit
								</Button>
							</Segment>
						</Segment.Group>
					</Form>
				</Grid.Column>
			</Grid>
		)
	}
	_addBalance = async () => {
		let { accountChargedId, amountRecieved, balBefore, CashBalId } = this.state

		const dateIssued = moment().format()
		await this.props.addBalance({
			variables: {
				accountChargedId,
				amountRecieved,
				dateIssued,
				balBefore,
				CashBalId,
			},
		})
		this.props.history.push('/cashbalances/list')
	}
}

const ADDACCOUNTBALANCE = gql`
	mutation addBalance(
		$accountChargedId: ID!
		$CashBalId: ID!
		$balBefore: Int!
		$dateIssued: DateTime!
		$amountRecieved: Int!
	) {
		addCashReceipt(
			accountChargedId: $accountChargedId
			CashBalId: $CashBalId
			dateIssued: $dateIssued
			balBefore: $balBefore
			amountRecieved: $amountRecieved
		) {
			id
		}
	}
`

export default compose(
	graphql(GETACCOUNTS, {
		name: 'accountFeed',
	}),
	graphql(ADDACCOUNTBALANCE, {
		name: 'addBalance',
	}),
)(CashRecord)
